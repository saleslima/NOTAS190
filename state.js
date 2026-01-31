import { DEFAULT_ITEMS, DEFAULT_COLORS, STORAGE_KEY_V3, STORAGE_KEY_THEME, STORAGE_KEY_VIEW, STORAGE_KEY_PAGE_VIEWS, STORAGE_KEY_DARK_MODE } from "./constants.js";

export const state = {
    categories: [],
    activeCategoryId: null,
    currentTheme: {},
    viewMode: 'grid',
    urgentMessage: '',
    urgentBlinkSpeed: '1s',
    documents: [],
    isAdmin: false,
    isDocsAdmin: false,
    hasUnsavedChanges: false,
    pageViews: 0,
    isDarkMode: false
};

export function initLocalState() {
    state.categories = loadLocalData();
    state.activeCategoryId = state.categories.length > 0 ? state.categories[0].id : null;
    state.currentTheme = loadLocalTheme();
    state.viewMode = localStorage.getItem(STORAGE_KEY_VIEW) || 'grid';
    state.pageViews = 0; // Will be loaded from Firebase
    state.isDarkMode = localStorage.getItem(STORAGE_KEY_DARK_MODE) === 'true';
}

function loadLocalData() {
    // Try loading V3 data from local storage as backup/initial state
    const v3Data = localStorage.getItem(STORAGE_KEY_V3);
    if (v3Data) {
        return JSON.parse(v3Data);
    }

    // Default structure if nothing exists
    return [
        {
            id: 'default_notas190',
            name: 'NOTAS 190',
            items: DEFAULT_ITEMS
        }
    ];
}

export function loadLocalTheme() {
    const themeData = localStorage.getItem(STORAGE_KEY_THEME);
    if (themeData) {
        return JSON.parse(themeData);
    }
    return { ...DEFAULT_COLORS };
}

export function saveTheme() {
    localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(state.currentTheme));
}