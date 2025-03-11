/**
 * @typedef {object} Tour
 * @property {function(function(boolean)): void} init - Initializes the tour by loading external libraries.
 * @property {function(object): void} generateDialog - Generates a dialog item (currently empty).
 */

console.log('tour.js is here');

const FLOATING_UI_CORE_URL = "https://cdn.jsdelivr.net/npm/@floating-ui/core@1.6.9";
const FLOATING_UI_DOM_URL = "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.13";

bw.tour = {
    /**
     * Initializes the tour by asynchronously loading floating-ui libraries.
     * @param {function(boolean): void} cb - Callback function, called with true on success, false on failure.
     * @returns {void}
     */
    init: function (cb) {
        const loadFloatingUILibraries = () => {
            bw.util.loadScriptAsync(FLOATING_UI_CORE_URL, () => {
                bw.util.loadScriptAsync(FLOATING_UI_DOM_URL, () => {
                    cb && cb(true);
                }, (err) => {
                    console.error("Failed to load @floating-ui/dom:", err);
                    cb && cb(false);
                });
            }, (err) => {
                console.error("Failed to load @floating-ui/core:", err);
                cb && cb(false);
            });
        };

        loadFloatingUILibraries();
    },
    /**
     * Generates a dialog item.  Currently, this function is empty.
     * @param {object} dialogItem - The dialog item to generate.
     * @returns {void}
     */
    generateDialog: function (dialogItem) {
        // Implementation for generating a dialog will be added here
    },
};

(function () {
    bw.tour.init((isLoaded) => {
        if (isLoaded) {
            console.log("Tour initialized successfully!");
        } else {
            console.warn("Tour initialization failed.");
        }
    });
})();