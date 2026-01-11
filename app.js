import { initLocalState } from "./state.js";
import { init } from "./logic.js";

// Initialize the application
initLocalState();
init();

// Tombstones for refactored code:
// removed firebase imports (moved to firebase-setup.js)
// removed const firebaseConfig (moved to constants.js)
// removed initializeApp (moved to firebase-setup.js)
// removed const DB_REF, PASSWORD, STORAGE_KEYs, DEFAULT_COLORS, DEFAULT_ITEMS (moved to constants.js)
// removed let categories, activeCategoryId, currentTheme... (moved to state.js)
// removed loadLocalData, loadLocalTheme (moved to state.js)
// removed DOM Element constants (moved to dom.js)
// removed init(), initCloudSync() (moved to logic.js)
// removed renderAll(), renderCategories(), renderButtons() (moved to ui.js)
// removed handleButtonClick(), copyToClipboard(), animateButton(), showToast() (moved to logic.js and ui.js)
// removed toggleAdmin(), openModal(), closeModal(), saveButton(), deleteButton() (moved to logic.js and ui.js)
// removed openCategoryModal(), closeCategoryModal(), saveCategory(), deleteCategory() (moved to logic.js and ui.js)
// removed markUnsaved(), saveToCloud(), saveTheme() (moved to logic.js and state.js)
// removed showGlobalTooltip(), hideGlobalTooltip() (moved to ui.js)
// removed openSettings(), loadSettingsToInputs(), closeSettings(), updateColorSetting(), applySettings(), resetColors() (moved to ui.js and logic.js)
// removed setupEventListeners() (moved to logic.js)
// removed toggleViewMode(), applyViewMode() (moved to logic.js and ui.js)
// removed handleUrgentClick(), saveUrgentMessage(), renderUrgentMessage() (moved to logic.js and ui.js)
// removed openDocsModal(), renderDocsList(), saveNewDoc(), deleteDoc() (moved to logic.js and ui.js)
// removed performSearch(), renderSearchResults() (moved to logic.js and ui.js)