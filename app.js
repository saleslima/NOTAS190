const PASSWORD = "subtop";
const STORAGE_KEY_V2 = "quick_msg_buttons_v2";
const STORAGE_KEY_V3 = "quick_msg_data_v3";
const SETTINGS_KEY = "quick_msg_settings_v1";

// Default settings
const DEFAULT_COLORS = {
    pageBg: "#f4f4f4",
    bg: "#ffffff",
    text: "#333333",
    active: "#2ecc71"
};

const DEFAULT_ITEMS = [
    { id: '1', label: 'Motivo de Não Disponível (Agent-MICC)', message: 'Lembre-se de alterar seu status quando se ausentar para pausas ou ao terminar o cadastro de ocorrência.' },
    { id: '2', label: 'Posatende', message: 'Informe ao supervisor que o contato foi encerrado e você está finalizando a ocorrência no sistema.' },
    { id: '3', label: 'Comunicação com Supervisão', message: 'Ao informar à supervisão, sempre comece com o número do talão e, em seguida, o contexto da ocorrência.' },
    { id: '4', label: 'Receber Ligação', message: 'Quando receber uma ligação, preencha as informações necessárias no sistema.' },
    { id: '5', label: 'Verificação de Número', message: 'Verifique se o número da ligação é válido e não é um número espelho.' },
    { id: '6', label: 'Informar Supervisão', message: 'Informe a supervisão sobre ocorrências importantes e insira as informações corretas no sistema.' },
    { id: '7', label: 'Ocorrência de Trote', message: 'Em caso de trote, registre todas as informações no histórico e informe ao solicitante.' },
    { id: '8', label: 'Transferência de Ligação', message: 'Se uma ligação for transferida, verifique se o número do solicitante está correto e adicione-o ao sistema.' },
    { id: '9', label: 'Retorno de Ligação', message: 'Retorne ligações que necessitam de dados adicionais ou para confirmar informações.' },
    { id: '10', label: 'Solicitação de Apoio', message: 'Em casos críticos, solicite apoio imediatamente utilizando os meios disponíveis.' },
    { id: '11', label: 'Relatar Ocorrência Crítica', message: 'Em caso de ocorrências graves, reporte à supervisão imediatamente.' },
    { id: '12', label: 'Aviso de Mudança de Escala', message: 'Informe se houver mudanças nas escalas de atendimento, como folgas ou novos turnos.' },
    { id: '13', label: 'Cancelamento de Ocorrência', message: 'Se a ocorrência for cancelada, registre corretamente a alteração no sistema.' },
    { id: '14', label: 'Atualização de Status', message: 'Atualize seu status quando necessário, especialmente em períodos de pausa ou quando estiver concluindo um atendimento.' },
    { id: '15', label: 'Ocorrência de Vazamento de Dados', message: 'Informe imediatamente sobre qualquer possível vazamento de dados ou falha de segurança.' },
    { id: '16', label: 'Interrupção de Atendimento', message: 'Se houver necessidade de interromper o atendimento, informe o solicitante sobre o motivo e a solução.' },
    { id: '17', label: 'Solicitação de Auxílio', message: 'Caso precise de auxílio, entre em contato com o supervisor ou responsável imediatamente.' },
    { id: '18', label: 'Suspensão Temporária', message: 'Caso haja necessidade de suspensão temporária do atendimento, informe aos responsáveis e registre a mudança.' },
    { id: '19', label: 'Erro de Registro', message: 'Se houver erro no registro de ocorrência, corrija-o o mais rápido possível e comunique aos superiores.' },
    { id: '20', label: 'Encerramento de Atendimento', message: 'Ao encerrar um atendimento, confirme que todas as informações foram registradas corretamente.' },
    { id: '21', label: 'Pedido de Desbloqueio', message: 'Registre o pedido de desbloqueio de acesso ao sistema, se solicitado.' },
    { id: '22', label: 'Falha de Sistema', message: 'Em caso de falha no sistema, registre a ocorrência e entre em contato com a equipe técnica.' },
    { id: '23', label: 'Aviso de Manutenção', message: 'Informe ao cliente sobre a manutenção programada e como ela pode afetar o atendimento.' },
    { id: '24', label: 'Novo Procedimento', message: 'Informe sobre qualquer novo procedimento a ser seguido durante o atendimento.' },
    { id: '25', label: 'Ajuste de Escala', message: 'Se ocorrer algum ajuste na escala de atendimento, faça a atualização no sistema.' },
    { id: '26', label: 'Verificação de Pendência', message: 'Verifique e resolva quaisquer pendências antes de finalizar o atendimento.' },
    { id: '27', label: 'Atendimento de Urgência', message: 'Em casos urgentes, priorize o atendimento e registre todos os detalhes de forma clara.' },
    { id: '28', label: 'Alerta de Segurança', message: 'Caso detecte alguma falha de segurança, informe imediatamente à supervisão.' },
    { id: '29', label: 'Acompanhamento de Chamado', message: 'Realize o acompanhamento dos chamados em aberto e atualize o status conforme necessário.' },
    { id: '30', label: 'Escala de Revezamento', message: 'Em situações de revezamento de equipe, informe aos responsáveis sobre os horários e turnos.' },
    { id: '31', label: 'Problema de Comunicação', message: 'Se houver qualquer problema de comunicação, resolva com a maior brevidade possível.' },
    { id: '32', label: 'Relatório de Desempenho', message: 'Prepare relatórios de desempenho e envio para a supervisão.' },
    { id: '33', label: 'Alteração de Regras', message: 'Informe sobre qualquer alteração nas regras ou procedimentos internos.' },
    { id: '34', label: 'Atualização de Sistema', message: 'Caso haja atualização no sistema, registre as mudanças e informe aos envolvidos.' },
    { id: '35', label: 'Resposta a Solicitação', message: 'Se houver alguma solicitação, responda dentro do prazo e conforme as regras estabelecidas.' },
    { id: '36', label: 'Verificação de Informações', message: 'Antes de finalizar qualquer atendimento, verifique as informações fornecidas.' },
    { id: '37', label: 'Correção de Dados', message: 'Caso haja necessidade de corrigir algum dado, faça isso o mais rápido possível.' },
    { id: '38', label: 'Revisão de Chamado', message: 'Revise os chamados para garantir que todos os dados foram inseridos corretamente.' },
    { id: '39', label: 'Gestão de Equipe', message: 'Realize a gestão e o monitoramento da equipe de atendimento.' },
    { id: '40', label: 'Encerramento de Escala', message: 'Realize o encerramento da sua escala de atendimento conforme a programação.' }
];

// State & Migration Logic
let categories = loadData();
let activeCategoryId = categories.length > 0 ? categories[0].id : null;
let userSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || DEFAULT_COLORS;
let isAdmin = false;

function loadData() {
    // Try loading V3 data
    const v3Data = localStorage.getItem(STORAGE_KEY_V3);
    if (v3Data) {
        return JSON.parse(v3Data);
    }

    // Fallback: Check for V2 data and migrate
    const v2Data = localStorage.getItem(STORAGE_KEY_V2);
    let items = DEFAULT_ITEMS;
    
    if (v2Data) {
        try {
            items = JSON.parse(v2Data);
        } catch (e) {
            console.error("Error migrating V2 data", e);
        }
    }

    // Create default structure
    const initialData = [
        {
            id: 'default_notas190',
            name: 'NOTAS 190',
            items: items
        }
    ];
    
    // Save as V3
    localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(initialData));
    return initialData;
}

// DOM Elements
const grid = document.getElementById('button-grid');
const nav = document.getElementById('category-nav');
const adminToggle = document.getElementById('admin-toggle');
const settingsToggle = document.getElementById('settings-toggle');
const addBtn = document.getElementById('add-btn');

// CRUD Button Modal Elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const form = document.getElementById('msg-form');
const msgIdInput = document.getElementById('msg-id');
const labelInput = document.getElementById('msg-label');
const textInput = document.getElementById('msg-text');
const deleteBtn = document.getElementById('delete-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Category Modal Elements
const catModal = document.getElementById('cat-modal');
const catForm = document.getElementById('cat-form');
const catNameInput = document.getElementById('cat-name');
const catCancelBtn = document.getElementById('cat-cancel-btn');

// Settings Modal Elements
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const resetColorsBtn = document.getElementById('reset-colors-btn');
const colorPageBgInput = document.getElementById('color-page-bg');
const colorBgInput = document.getElementById('color-bg');
const colorTextInput = document.getElementById('color-text');
const colorActiveInput = document.getElementById('color-active');

const toast = document.getElementById('toast');
const globalTooltip = document.getElementById('global-tooltip');

// Initialize
function init() {
    applySettings();
    renderAll();
    setupEventListeners();
}

function renderAll() {
    renderCategories();
    renderButtons();
}

// Render Categories (Menu)
function renderCategories() {
    nav.innerHTML = '';
    
    categories.forEach(cat => {
        const navItem = document.createElement('button');
        navItem.className = `nav-item ${cat.id === activeCategoryId ? 'active' : ''}`;
        navItem.textContent = cat.name;
        navItem.addEventListener('click', () => {
            activeCategoryId = cat.id;
            renderAll();
        });
        nav.appendChild(navItem);
    });

    // Add Category Button (Only if admin)
    if (isAdmin) {
        const addCatBtn = document.createElement('button');
        addCatBtn.className = 'add-cat-btn';
        addCatBtn.innerHTML = '<i class="fas fa-plus"></i>';
        addCatBtn.title = "Nova Categoria";
        addCatBtn.addEventListener('click', openCategoryModal);
        nav.appendChild(addCatBtn);
    }
}

// Render Buttons for Active Category
function renderButtons() {
    grid.innerHTML = '';
    
    const currentCategory = categories.find(c => c.id === activeCategoryId);
    if (!currentCategory) return;

    currentCategory.items.forEach(btn => {
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
        buttonEl.addEventListener('click', () => handleButtonClick(btn, buttonEl));

        grid.appendChild(buttonEl);
    });
}

// Button Click Logic
function handleButtonClick(btnData, element) {
    if (isAdmin) {
        // Edit mode: open modal
        openModal(btnData);
    } else {
        // Normal mode: copy text
        copyToClipboard(btnData.message);
        animateButton(element);
        showToast();
    }
}

// Clipboard Action
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    }
}

// Visual Feedback
function animateButton(element) {
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

function showToast() {
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2000);
}

// Admin / Auth Logic
function toggleAdmin() {
    if (isAdmin) {
        // Logout
        isAdmin = false;
        document.body.classList.remove('admin-mode');
        addBtn.classList.add('hidden');
        const icon = adminToggle.querySelector('i');
        icon.className = 'fas fa-lock';
    } else {
        // Login attempt
        const input = prompt("Digite a senha de administrador:");
        if (input === PASSWORD) {
            isAdmin = true;
            document.body.classList.add('admin-mode');
            addBtn.classList.remove('hidden');
            const icon = adminToggle.querySelector('i');
            icon.className = 'fas fa-lock-open';
        } else if (input !== null) {
            alert("Senha incorreta!");
        }
    }
}

// CRUD Modal Logic
function openModal(btnData = null) {
    modal.classList.remove('hidden');
    
    if (btnData) {
        // Edit mode
        modalTitle.textContent = "Editar Botão";
        msgIdInput.value = btnData.id;
        labelInput.value = btnData.label;
        textInput.value = btnData.message;
        deleteBtn.classList.remove('hidden');
    } else {
        // Create mode
        modalTitle.textContent = "Novo Botão";
        msgIdInput.value = '';
        labelInput.value = '';
        textInput.value = '';
        deleteBtn.classList.add('hidden');
    }
}

function closeModal() {
    modal.classList.add('hidden');
}

function saveButton(e) {
    e.preventDefault();
    
    const id = msgIdInput.value;
    const label = labelInput.value;
    const message = textInput.value;

    if (!label || !message) return;

    const catIndex = categories.findIndex(c => c.id === activeCategoryId);
    if (catIndex === -1) return;

    if (id) {
        // Update existing in current category
        const items = categories[catIndex].items;
        const index = items.findIndex(b => b.id === id);
        if (index !== -1) {
            items[index] = { id, label, message };
        }
    } else {
        // Create new
        const newBtn = {
            id: Date.now().toString(),
            label,
            message
        };
        categories[catIndex].items.push(newBtn);
    }

    saveToStorage();
    renderAll();
    closeModal();
}

function deleteButton() {
    const id = msgIdInput.value;
    const catIndex = categories.findIndex(c => c.id === activeCategoryId);
    if (catIndex === -1) return;

    if (id && confirm("Tem certeza que deseja excluir este botão?")) {
        categories[catIndex].items = categories[catIndex].items.filter(b => b.id !== id);
        saveToStorage();
        renderAll();
        closeModal();
    }
}

// Category CRUD
function openCategoryModal() {
    catModal.classList.remove('hidden');
    catNameInput.value = '';
}

function closeCategoryModal() {
    catModal.classList.add('hidden');
}

function saveCategory(e) {
    e.preventDefault();
    const name = catNameInput.value.trim();
    if (!name) return;

    const newCat = {
        id: 'cat_' + Date.now(),
        name: name,
        items: []
    };
    
    categories.push(newCat);
    // Switch to new category
    activeCategoryId = newCat.id;
    
    saveToStorage();
    renderAll();
    closeCategoryModal();
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(categories));
}

// Global Tooltip Logic
function showGlobalTooltip(e, message) {
    const rect = e.target.getBoundingClientRect();
    globalTooltip.textContent = message;
    globalTooltip.classList.remove('hidden');
    
    // Calculate position (centered above button)
    // We do this after removing hidden so we can get dimensions of tooltip if needed, 
    // but textContent usually enough for estimation. 
    // Better to just set top/left.
    
    // Basic centering relative to button
    const tooltipX = rect.left + (rect.width / 2) - (globalTooltip.offsetWidth / 2);
    const tooltipY = rect.top - globalTooltip.offsetHeight - 10; // 10px padding

    // Boundary checks can be added here if needed, but fixed position handles most
    // Just ensure it's not offscreen left
    const finalX = Math.max(10, tooltipX);
    
    globalTooltip.style.left = `${finalX}px`;
    globalTooltip.style.top = `${tooltipY}px`;
    globalTooltip.style.opacity = '1';
}

function hideGlobalTooltip() {
    globalTooltip.classList.add('hidden');
    globalTooltip.style.opacity = '0';
}

// Settings Logic
function openSettings() {
    settingsModal.classList.remove('hidden');
    // Load current settings into inputs
    colorPageBgInput.value = userSettings.pageBg || DEFAULT_COLORS.pageBg;
    colorBgInput.value = userSettings.bg;
    colorTextInput.value = userSettings.text;
    colorActiveInput.value = userSettings.active;
}

function closeSettings() {
    settingsModal.classList.add('hidden');
}

function updateColorSetting(key, value) {
    userSettings[key] = value;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(userSettings));
    applySettings();
}

function applySettings() {
    const root = document.documentElement;
    root.style.setProperty('--page-bg', userSettings.pageBg || DEFAULT_COLORS.pageBg);
    root.style.setProperty('--btn-bg', userSettings.bg);
    root.style.setProperty('--btn-text', userSettings.text);
    root.style.setProperty('--btn-active', userSettings.active);
}

function resetColors() {
    userSettings = { ...DEFAULT_COLORS };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(userSettings));
    
    // Update inputs
    colorPageBgInput.value = userSettings.pageBg;
    colorBgInput.value = userSettings.bg;
    colorTextInput.value = userSettings.text;
    colorActiveInput.value = userSettings.active;
    
    applySettings();
}

// Event Listeners
function setupEventListeners() {
    adminToggle.addEventListener('click', () => {
        toggleAdmin();
        renderCategories(); // Re-render to show/hide add category btn
    });
    settingsToggle.addEventListener('click', openSettings);
    
    addBtn.addEventListener('click', () => {
        if(isAdmin) openModal(); 
    });

    // CRUD Button Modal Listeners
    cancelBtn.addEventListener('click', closeModal);
    form.addEventListener('submit', saveButton);
    deleteBtn.addEventListener('click', deleteButton);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Category Modal Listeners
    catCancelBtn.addEventListener('click', closeCategoryModal);
    catForm.addEventListener('submit', saveCategory);
    catModal.addEventListener('click', (e) => {
        if (e.target === catModal) closeCategoryModal();
    });

    // Settings Modal Listeners
    closeSettingsBtn.addEventListener('click', closeSettings);
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettings();
    });
    
    // Live Color Updates
    colorPageBgInput.addEventListener('input', (e) => updateColorSetting('pageBg', e.target.value));
    colorBgInput.addEventListener('input', (e) => updateColorSetting('bg', e.target.value));
    colorTextInput.addEventListener('input', (e) => updateColorSetting('text', e.target.value));
    colorActiveInput.addEventListener('input', (e) => updateColorSetting('active', e.target.value));
    
    resetColorsBtn.addEventListener('click', resetColors);
}

// Run
init();