import { state, saveTheme } from "./state.js";
import * as DOM from "./dom.js";
import * as UI from "./ui.js";
import { DB_REF, STORAGE_KEY_V3, STORAGE_KEY_VIEW, STORAGE_KEY_DARK_MODE, PASSWORD, DEFAULT_COLORS } from "./constants.js";
import { db } from "./firebase-setup.js";
import { ref, set, onValue, runTransaction } from "https://esm.sh/firebase/database";

export function init() {
    UI.applySettings(state.currentTheme);
    UI.applyViewMode();
    UI.applyDarkMode();
    UI.renderAll();
    setupEventListeners();
    initCloudSync();
}

let hasIncrementedPageViews = false;

export function initCloudSync() {
    const dbRef = ref(db, DB_REF);
    
    // Increment page views atomically on first load
    if (!hasIncrementedPageViews) {
        hasIncrementedPageViews = true;
        const pageViewsRef = ref(db, `${DB_REF}/pageViews`);
        runTransaction(pageViewsRef, (currentValue) => {
            return (currentValue || 0) + 1;
        });
    }
    
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        
        if (data) {
            if (data.categories) {
                if (!state.hasUnsavedChanges) {
                    const incomingCategories = data.categories;
                    if (JSON.stringify(incomingCategories) !== JSON.stringify(state.categories)) {
                        state.categories = incomingCategories;
                        
                        // Validate active category
                        const currentCatExists = state.categories.find(c => c.id === state.activeCategoryId);
                        if (!currentCatExists && state.categories.length > 0) {
                            state.activeCategoryId = state.categories[0].id;
                        } else if (state.categories.length === 0) {
                            state.activeCategoryId = null;
                        }

                        UI.renderAll();
                        localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(state.categories));
                    }
                }
            }

            if (data.urgentMessage !== undefined) {
                state.urgentMessage = data.urgentMessage;
                state.urgentBlinkSpeed = data.urgentBlinkSpeed || '1s';
                UI.renderUrgentMessage();
            }

            if (data.documents) {
                state.documents = data.documents;
                UI.renderDocsList();
            } else {
                state.documents = [];
            }

            // Always update page views display from Firebase
            if (data.pageViews !== undefined) {
                state.pageViews = data.pageViews;
                UI.renderPageViews();
            }

        } else {
            saveToCloud();
        }
    }, (error) => {
        console.error("Firebase Sync Error:", error);
    });
}

export async function saveToCloud() {
    localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(state.categories));
    
    try {
        await set(ref(db, DB_REF), {
            categories: state.categories,
            urgentMessage: state.urgentMessage,
            urgentBlinkSpeed: state.urgentBlinkSpeed,
            documents: state.documents,
            pageViews: state.pageViews
        });
        
        state.hasUnsavedChanges = false;
        DOM.saveBtn.classList.add('hidden');
        DOM.saveBtn.classList.remove('pulse-animation');
        UI.showToast("Salvo na nuvem!");
        return true;
    } catch (e) {
        console.error("Error saving to Firebase:", e);
        UI.showToast("Erro ao salvar online!");
        return false;
    }
}

function markUnsaved() {
    state.hasUnsavedChanges = true;
    localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(state.categories));
    DOM.saveBtn.classList.remove('hidden');
    DOM.saveBtn.classList.add('pulse-animation');
}

export function handleButtonClick(btnData, element) {
    if (state.isAdmin) {
        UI.openModal(btnData);
    } else {
        const msg = btnData.message.trim();
        const isUrl = /^(http|https):\/\/[^ "]+$/.test(msg);

        if (isUrl) {
            window.open(msg, '_blank');
        } else {
            copyToClipboard(btnData.message);
            UI.animateButton(element);
            UI.showToast();
        }
    }
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    }
}

export async function toggleAdmin() {
    if (state.isAdmin) {
        state.isAdmin = false;
        document.body.classList.remove('admin-mode');
        DOM.addBtn.classList.add('hidden');
        const icon = DOM.adminToggle.querySelector('i');
        icon.className = 'fas fa-lock';
        DOM.addDocBtn.classList.add('hidden');

        if (state.hasUnsavedChanges) {
            UI.showToast("Salvando alterações...");
            await saveToCloud();
        }
    } else {
        const input = prompt("Digite a senha de administrador:");
        if (input === PASSWORD) {
            state.isAdmin = true;
            document.body.classList.add('admin-mode');
            DOM.addBtn.classList.remove('hidden');
            const icon = DOM.adminToggle.querySelector('i');
            icon.className = 'fas fa-lock-open';
            DOM.addDocBtn.classList.remove('hidden');
        } else if (input !== null) {
            alert("Senha incorreta!");
        }
    }
}

// CRUD Button Logic
export function saveButton(e) {
    e.preventDefault();
    
    const id = DOM.msgIdInput.value;
    const label = DOM.labelInput.value;
    const message = DOM.textInput.value;

    if (!label || !message) return;

    const catIndex = state.categories.findIndex(c => c.id === state.activeCategoryId);
    if (catIndex === -1) return;

    if (id) {
        const items = state.categories[catIndex].items;
        const index = items.findIndex(b => b.id === id);
        if (index !== -1) {
            items[index] = { id, label, message };
        }
    } else {
        const newBtn = {
            id: Date.now().toString(),
            label,
            message
        };
        state.categories[catIndex].items.push(newBtn);
    }

    markUnsaved();
    UI.renderAll();
    UI.closeModal();
}

export function deleteButton() {
    const id = DOM.msgIdInput.value;
    const catIndex = state.categories.findIndex(c => c.id === state.activeCategoryId);
    if (catIndex === -1) return;

    if (id && confirm("Tem certeza que deseja excluir este botão?")) {
        state.categories[catIndex].items = state.categories[catIndex].items.filter(b => b.id !== id);
        markUnsaved();
        UI.renderAll();
        UI.closeModal();
    }
}

// Category CRUD
export function saveCategory(e) {
    e.preventDefault();
    
    const name = DOM.catNameInput.value.trim();
    const id = DOM.catIdInput.value;
    if (!name) return;

    if (id) {
        const cat = state.categories.find(c => c.id === id);
        if (cat) {
            cat.name = name;
        }
    } else {
        const newCat = {
            id: 'cat_' + Date.now(),
            name: name,
            items: []
        };
        state.categories.push(newCat);
        state.activeCategoryId = newCat.id;
    }
    
    markUnsaved();
    UI.renderAll();
    UI.closeCategoryModal();
}

export function deleteCategory() {
    const cat = state.categories.find(c => c.id === state.activeCategoryId);
    if (!cat) return;

    let warning = "Tem certeza que deseja excluir esta categoria?";
    if (cat.items && cat.items.length > 0) {
        warning = `ATENÇÃO:\nEsta categoria possui ${cat.items.length} botões associados.\nAo excluir a categoria, TODOS os botões serão apagados permanentemente.\n\nDeseja continuar?`;
    }

    if (confirm(warning)) {
        state.categories = state.categories.filter(c => c.id !== state.activeCategoryId);
        state.activeCategoryId = state.categories.length > 0 ? state.categories[0].id : null;
        
        markUnsaved();
        UI.renderAll();
    }
}

// Urgent
export function handleUrgentClick() {
    // Always verify password for urgent messages
    const input = prompt("Digite a senha de administrador para acessar:");
    if (input !== PASSWORD) {
        if (input !== null) alert("Senha incorreta!");
        return;
    }
    
    DOM.urgentModal.classList.remove('hidden');
    DOM.urgentInput.value = state.urgentMessage;
    DOM.urgentBlinkSpeed.value = state.urgentBlinkSpeed;
}

export function saveUrgentMessage(e) {
    e.preventDefault();
    
    state.urgentMessage = DOM.urgentInput.value.trim();
    state.urgentBlinkSpeed = DOM.urgentBlinkSpeed.value;
    UI.renderUrgentMessage();
    DOM.urgentModal.classList.add('hidden');
    
    markUnsaved();
    saveToCloud();
}

// Docs
export async function saveNewDoc(e) {
    e.preventDefault();
    const title = DOM.docTitleInput.value.trim();
    const file = DOM.docFileInput.files[0];
    
    if (!title || !file) return;

    UI.showToast("Fazendo upload...");
    
    try {
        const url = await window.websim.upload(file);
        
        if (!state.documents) state.documents = [];
        
        state.documents.push({
            id: Date.now().toString(),
            title,
            url,
            downloadCount: 0
        });

        DOM.docForm.classList.add('hidden');
        UI.renderDocsList();
        
        markUnsaved();
        await saveToCloud();
    } catch (err) {
        console.error("Upload error", err);
        alert("Erro ao enviar arquivo.");
    }
}

export function deleteDoc(id) {
    if (confirm("Deseja excluir este documento?")) {
        state.documents = state.documents.filter(d => d.id !== id);
        UI.renderDocsList();
        markUnsaved();
        saveToCloud();
    }
}

export async function downloadDocAsZip(doc) {
    try {
        UI.showToast("Preparando download...");
        
        // Fetch the file
        const response = await fetch(doc.url);
        const blob = await response.blob();
        
        // Create a zip file
        const zip = new JSZip();
        const filename = doc.title.replace(/[^a-z0-9]/gi, '_') + '.pdf';
        zip.file(filename, blob);
        
        // Generate the zip
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        
        // Create download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = doc.title.replace(/[^a-z0-9]/gi, '_') + '.zip';
        link.click();
        
        // Increment download count
        const docToUpdate = state.documents.find(d => d.id === doc.id);
        if (docToUpdate) {
            docToUpdate.downloadCount = (docToUpdate.downloadCount || 0) + 1;
            UI.renderDocsList();
            await saveToCloud();
        }
        
        UI.showToast("Download iniciado!");
    } catch (err) {
        console.error("Download error", err);
        alert("Erro ao fazer download.");
    }
}

// Search
export function performSearch(query) {
    if (!query) {
        UI.renderButtons();
        return;
    }

    const lowerQuery = query.toLowerCase();
    const allItems = [];
    state.categories.forEach(cat => {
        cat.items.forEach(item => {
            allItems.push(item);
        });
    });

    const results = allItems.filter(item => 
        item.label.toLowerCase().includes(lowerQuery) || 
        item.message.toLowerCase().includes(lowerQuery)
    );

    UI.renderSearchResults(results);
}

// Settings
export function updateColorSetting(key, value) {
    state.currentTheme[key] = value;
    UI.applySettings(state.currentTheme);
    saveTheme();
}

export function resetColors() {
    state.currentTheme = { ...DEFAULT_COLORS };
    UI.loadSettingsToInputs();
    UI.applySettings(state.currentTheme);
    saveTheme();
}

// View Mode
export function toggleViewMode() {
    state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
    localStorage.setItem(STORAGE_KEY_VIEW, state.viewMode);
    UI.applyViewMode();
}

// Dark Mode
export function toggleDarkMode() {
    state.isDarkMode = !state.isDarkMode;
    localStorage.setItem(STORAGE_KEY_DARK_MODE, state.isDarkMode.toString());
    UI.applyDarkMode();
}

// Docs Admin Mode
export function toggleDocsAdmin() {
    if (state.isDocsAdmin) {
        state.isDocsAdmin = false;
        UI.updateDocsAdminUI(false);
    } else {
        const input = prompt("Digite a senha de administrador:");
        if (input === PASSWORD) {
            state.isDocsAdmin = true;
            UI.updateDocsAdminUI(true);
        } else if (input !== null) {
            alert("Senha incorreta!");
        }
    }
}

export function setupEventListeners() {
    DOM.adminToggle.addEventListener('click', () => {
        toggleAdmin();
        UI.renderCategories();
    });
    
    DOM.saveBtn.addEventListener('click', saveToCloud);
    DOM.settingsToggle.addEventListener('click', UI.openSettings);
    
    DOM.addBtn.addEventListener('click', () => {
        if(state.isAdmin) UI.openModal(); 
    });

    // CRUD Button Modal
    DOM.cancelBtn.addEventListener('click', UI.closeModal);
    DOM.form.addEventListener('submit', saveButton);
    DOM.deleteBtn.addEventListener('click', deleteButton);
    DOM.modal.addEventListener('click', (e) => {
        if (e.target === DOM.modal) UI.closeModal();
    });

    // Category Modal
    DOM.catCancelBtn.addEventListener('click', UI.closeCategoryModal);
    DOM.catForm.addEventListener('submit', saveCategory);
    DOM.catModal.addEventListener('click', (e) => {
        if (e.target === DOM.catModal) UI.closeCategoryModal();
    });

    // Settings Modal
    DOM.closeSettingsBtn.addEventListener('click', UI.closeSettings);
    DOM.settingsModal.addEventListener('click', (e) => {
        if (e.target === DOM.settingsModal) UI.closeSettings();
    });
    
    DOM.colorPageBgInput.addEventListener('input', (e) => updateColorSetting('pageBg', e.target.value));
    DOM.colorBgInput.addEventListener('input', (e) => updateColorSetting('bg', e.target.value));
    DOM.colorTextInput.addEventListener('input', (e) => updateColorSetting('text', e.target.value));
    DOM.colorActiveInput.addEventListener('input', (e) => updateColorSetting('active', e.target.value));
    
    DOM.resetColorsBtn.addEventListener('click', resetColors);

    // Search
    DOM.searchInput.addEventListener('input', (e) => performSearch(e.target.value.trim()));

    // View Toggle
    DOM.viewToggle.addEventListener('click', toggleViewMode);
    
    // Dark Mode Toggle
    DOM.darkModeToggle.addEventListener('click', toggleDarkMode);

    // Urgent
    DOM.urgentBtn.addEventListener('click', handleUrgentClick);
    DOM.urgentCancelBtn.addEventListener('click', () => DOM.urgentModal.classList.add('hidden'));
    DOM.urgentForm.addEventListener('submit', saveUrgentMessage);
    DOM.urgentModal.addEventListener('click', (e) => { if (e.target === DOM.urgentModal) DOM.urgentModal.classList.add('hidden'); });

    // Docs
    DOM.docsBtn.addEventListener('click', UI.openDocsModal);
    DOM.closeDocsBtn.addEventListener('click', () => {
        DOM.docsModal.classList.add('hidden');
        state.isDocsAdmin = false;
    });
    DOM.docsModal.addEventListener('click', (e) => { 
        if (e.target === DOM.docsModal) {
            DOM.docsModal.classList.add('hidden');
            state.isDocsAdmin = false;
        }
    });
    
    const docsAdminToggle = document.getElementById('docs-admin-toggle');
    if (docsAdminToggle) {
        docsAdminToggle.addEventListener('click', toggleDocsAdmin);
    }
    
    DOM.addDocBtn.addEventListener('click', () => {
        DOM.docForm.classList.remove('hidden');
        DOM.docTitleInput.value = '';
        DOM.docFileInput.value = '';
    });
    DOM.cancelDocFormBtn.addEventListener('click', () => DOM.docForm.classList.add('hidden'));
    DOM.docForm.addEventListener('submit', saveNewDoc);
}