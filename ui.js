import { state } from "./state.js";
import * as DOM from "./dom.js";
import { DEFAULT_COLORS } from "./constants.js";
import * as Logic from "./logic.js"; // Import logic to bind events

export function renderAll() {
    renderCategories();
    renderPageViews();
    if (DOM.searchInput.value.trim()) {
        Logic.performSearch(DOM.searchInput.value.trim());
    } else {
        renderButtons();
    }
}

export function renderPageViews() {
    if (DOM.viewCount) {
        DOM.viewCount.textContent = state.pageViews.toString();
    }
}

// Render Categories (Menu)
export function renderCategories() {
    DOM.navTrack.innerHTML = '';
    DOM.navControls.innerHTML = '';
    
    // Duplicate list for seamless scrolling if we have items
    if (state.categories.length > 0) {
        // Create the items list (duplicated for loop)
        const itemsToRender = [...state.categories, ...state.categories];
        
        itemsToRender.forEach((cat) => {
            const navItem = document.createElement('button');
            navItem.dataset.realId = cat.id; 
            navItem.className = `nav-item ${cat.id === state.activeCategoryId ? 'active' : ''}`;
            navItem.textContent = cat.name;
            
            navItem.addEventListener('click', () => {
                state.activeCategoryId = cat.id;
                DOM.searchInput.value = ''; // Clear search when changing category
                renderAll();
            });
            DOM.navTrack.appendChild(navItem);
        });
    }

    // Admin Controls (Fixed Position)
    if (state.isAdmin) {
        DOM.navControls.classList.remove('hidden');
        
        // Add Button
        const addBtn = createCtrlBtn('btn-add-cat', 'fa-plus', 'Nova Categoria', () => openCategoryModal());
        DOM.navControls.appendChild(addBtn);

        // Edit/Delete only if we have a category selected
        if (state.activeCategoryId && state.categories.length > 0) {
            const editBtn = createCtrlBtn('btn-edit-cat', 'fa-pen', 'Editar Categoria', () => {
                const cat = state.categories.find(c => c.id === state.activeCategoryId);
                if (cat) openCategoryModal(cat);
            });
            DOM.navControls.appendChild(editBtn);

            const delBtn = createCtrlBtn('btn-del-cat', 'fa-trash', 'Excluir Categoria', Logic.deleteCategory);
            DOM.navControls.appendChild(delBtn);
        }
    } else {
        DOM.navControls.classList.add('hidden');
    }
}

function createCtrlBtn(className, iconClass, title, onClick) {
    const btn = document.createElement('button');
    btn.className = `ctrl-btn ${className}`;
    btn.innerHTML = `<i class="fas ${iconClass}"></i>`;
    btn.title = title;
    btn.addEventListener('click', onClick);
    return btn;
}

// Render Buttons for Active Category
export function renderButtons() {
    DOM.grid.innerHTML = '';
    
    const currentCategory = state.categories.find(c => c.id === state.activeCategoryId);
    if (!currentCategory) return;

    currentCategory.items.forEach(btn => {
        const buttonEl = createButtonElement(btn);
        DOM.grid.appendChild(buttonEl);
    });
}

export function createButtonElement(btn) {
    const buttonEl = document.createElement('div');
    buttonEl.className = 'msg-btn';
    buttonEl.setAttribute('role', 'button');
    buttonEl.dataset.id = btn.id;
    
    // Label
    const span = document.createElement('span');
    span.textContent = btn.label;
    buttonEl.appendChild(span);

    // Tooltip Events (Global Tooltip)
    buttonEl.addEventListener('mouseenter', (e) => showGlobalTooltip(e, btn.message));
    buttonEl.addEventListener('mouseleave', hideGlobalTooltip);

    // Click Handler
    buttonEl.addEventListener('click', () => Logic.handleButtonClick(btn, buttonEl));

    return buttonEl;
}

export function renderSearchResults(items) {
    DOM.grid.innerHTML = '';
    
    if (items.length === 0) {
        DOM.grid.innerHTML = '<div class="no-results">Nenhum resultado encontrado.</div>';
        return;
    }

    items.forEach(btn => {
        const buttonEl = createButtonElement(btn);
        DOM.grid.appendChild(buttonEl);
    });
}

// Visual Feedback
export function animateButton(element) {
    // Remove class if it exists to reset animation
    element.classList.remove('copied');
    // Force reflow
    void element.offsetWidth;
    // Add class
    element.classList.add('copied');

    // Remove after 4 seconds
    setTimeout(() => {
        element.classList.remove('copied');
    }, 4000);
}

export function showToast(msg = "Copiado!") {
    DOM.toast.textContent = msg;
    DOM.toast.classList.remove('hidden');
    setTimeout(() => {
        DOM.toast.classList.add('hidden');
    }, 2000);
}

// Global Tooltip Logic
export function showGlobalTooltip(e, message) {
    const rect = e.target.getBoundingClientRect();
    DOM.globalTooltip.textContent = message;
    DOM.globalTooltip.classList.remove('hidden');
    
    const tooltipX = rect.left + (rect.width / 2) - (DOM.globalTooltip.offsetWidth / 2);
    const tooltipY = rect.top - DOM.globalTooltip.offsetHeight - 10; // 10px padding

    const finalX = Math.max(10, tooltipX);
    
    DOM.globalTooltip.style.left = `${finalX}px`;
    DOM.globalTooltip.style.top = `${tooltipY}px`;
    DOM.globalTooltip.style.opacity = '1';
}

export function hideGlobalTooltip() {
    DOM.globalTooltip.classList.add('hidden');
    DOM.globalTooltip.style.opacity = '0';
}

// Modals
export function openModal(btnData = null) {
    const input = prompt("Digite a senha de administrador:");
    if (input !== "subtop") {
        if (input !== null) alert("Senha incorreta!");
        return;
    }
    
    DOM.modal.classList.remove('hidden');
    
    if (btnData) {
        DOM.modalTitle.textContent = "Editar Botão";
        DOM.msgIdInput.value = btnData.id;
        DOM.labelInput.value = btnData.label;
        DOM.textInput.value = btnData.message;
        DOM.deleteBtn.classList.remove('hidden');
    } else {
        DOM.modalTitle.textContent = "Novo Botão";
        DOM.msgIdInput.value = '';
        DOM.labelInput.value = '';
        DOM.textInput.value = '';
        DOM.deleteBtn.classList.add('hidden');
    }
}

export function closeModal() {
    DOM.modal.classList.add('hidden');
}

export function openCategoryModal(cat = null) {
    const input = prompt("Digite a senha de administrador:");
    if (input !== "subtop") {
        if (input !== null) alert("Senha incorreta!");
        return;
    }
    
    DOM.catModal.classList.remove('hidden');
    if (cat) {
        DOM.catModalTitle.textContent = "Editar Categoria";
        DOM.catIdInput.value = cat.id;
        DOM.catNameInput.value = cat.name;
    } else {
        DOM.catModalTitle.textContent = "Nova Categoria";
        DOM.catIdInput.value = '';
        DOM.catNameInput.value = '';
    }
}

export function closeCategoryModal() {
    DOM.catModal.classList.add('hidden');
}

// Settings
export function openSettings() {
    DOM.settingsModal.classList.remove('hidden');
    loadSettingsToInputs();
}

export function closeSettings() {
    DOM.settingsModal.classList.add('hidden');
}

export function loadSettingsToInputs() {
    DOM.colorPageBgInput.value = state.currentTheme.pageBg || DEFAULT_COLORS.pageBg;
    DOM.colorBgInput.value = state.currentTheme.bg || DEFAULT_COLORS.bg;
    DOM.colorTextInput.value = state.currentTheme.text || DEFAULT_COLORS.text;
    DOM.colorActiveInput.value = state.currentTheme.active || DEFAULT_COLORS.active;
}

export function applySettings(theme) {
    const root = document.documentElement;
    root.style.setProperty('--page-bg', theme.pageBg || DEFAULT_COLORS.pageBg);
    root.style.setProperty('--btn-bg', theme.bg || DEFAULT_COLORS.bg);
    root.style.setProperty('--btn-text', theme.text || DEFAULT_COLORS.text);
    root.style.setProperty('--btn-active', theme.active || DEFAULT_COLORS.active);
}

// View Mode
export function applyViewMode() {
    if (state.viewMode === 'list') {
        DOM.grid.classList.add('list-view');
    } else {
        DOM.grid.classList.remove('list-view');
    }
    const icon = DOM.viewToggle.querySelector('i');
    icon.className = state.viewMode === 'grid' ? 'fas fa-list' : 'fas fa-th-large';
}

// Dark Mode
export function applyDarkMode() {
    if (state.isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    const icon = DOM.darkModeToggle.querySelector('i');
    icon.className = state.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// Urgent
export function renderUrgentMessage() {
    if (state.urgentMessage) {
        DOM.urgentBar.classList.remove('hidden');
        DOM.urgentContent.textContent = state.urgentMessage;
        
        if (state.urgentBlinkSpeed === 'none') {
            DOM.urgentBar.classList.add('no-blink');
        } else {
            DOM.urgentBar.classList.remove('no-blink');
            DOM.urgentBar.style.setProperty('--blink-speed', state.urgentBlinkSpeed);
        }
    } else {
        DOM.urgentBar.classList.add('hidden');
        DOM.urgentContent.textContent = '';
    }
}

// Docs
export function openDocsModal() {
    DOM.docsModal.classList.remove('hidden');
    renderDocsList();
    
    // Reset to non-admin mode when opening
    state.isDocsAdmin = false;
    updateDocsAdminUI(false);
    DOM.docForm.classList.add('hidden');
}

export function updateDocsAdminUI(isAdmin) {
    if (isAdmin) {
        DOM.addDocBtn.classList.remove('hidden');
        const adminBtn = document.getElementById('docs-admin-toggle');
        if (adminBtn) {
            adminBtn.innerHTML = '<i class="fas fa-lock-open"></i> Admin';
            adminBtn.style.background = 'var(--success)';
        }
    } else {
        DOM.addDocBtn.classList.add('hidden');
        const adminBtn = document.getElementById('docs-admin-toggle');
        if (adminBtn) {
            adminBtn.innerHTML = '<i class="fas fa-lock"></i> Admin';
            adminBtn.style.background = '#666';
        }
    }
    renderDocsList();
}

export function renderDocsList() {
    DOM.docsList.innerHTML = '';
    
    if (!state.documents || state.documents.length === 0) {
        DOM.docsList.innerHTML = '<p class="empty-docs">Nenhum documento disponível.</p>';
        return;
    }

    state.documents.forEach(doc => {
        const item = document.createElement('div');
        item.className = 'doc-item';
        
        const downloadCount = doc.downloadCount || 0;
        
        item.innerHTML = `
            <div class="doc-info">
                ${doc.title}
                <div style="font-size: 0.8rem; color: #666; margin-top: 0.3rem;">
                    <i class="fas fa-download"></i> ${downloadCount} downloads
                </div>
            </div>
            <div class="doc-actions">
                <a href="${doc.url}" target="_blank" class="doc-btn btn-view"><i class="fas fa-eye"></i> Ver</a>
                <button class="doc-btn btn-download download-zip-btn"><i class="fas fa-download"></i> Baixar</button>
            </div>
        `;

        // Add download handler
        const downloadBtn = item.querySelector('.download-zip-btn');
        downloadBtn.onclick = () => Logic.downloadDocAsZip(doc);

        if (state.isDocsAdmin) {
            const delBtn = document.createElement('button');
            delBtn.className = 'doc-btn btn-delete-doc';
            delBtn.innerHTML = '<i class="fas fa-trash"></i>';
            delBtn.onclick = () => Logic.deleteDoc(doc.id);
            item.querySelector('.doc-actions').appendChild(delBtn);
        }

        DOM.docsList.appendChild(item);
    });
}