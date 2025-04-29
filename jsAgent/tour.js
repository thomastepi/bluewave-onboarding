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
        this.loadFloatingUILibraries(async (result) => {
            const tourId = result.id;
            const tourData = await bw.data.getTourById(tourId);
            cb && cb(tourData);
        }, () => {
            cb && cb(false);
        });
    },
    /**
     * Generates a dialog item.  Currently, this function is empty.
     * @param {object} dialogItem - The dialog item to generate.
     * @returns {void}
     */
    generateDialog: function (dialogItem) {
        // Implementation for generating a dialog will be added here
    },
    loadFloatingUILibraries: function (cb) {
        bw.util.loadScriptAsync(FLOATING_UI_CORE_URL, () => {
            console.log("@floating-ui/core loaded successfully");
            bw.util.loadScriptAsync(FLOATING_UI_DOM_URL, () => {
                console.log("@floating-ui/dom loaded successfully");
                const options = window.bwonboarddata.tour[0];
                cb && cb(options);
            }, (err) => {
                console.error("Failed to load @floating-ui/dom:", err);
                cb && cb(false);
            });
        }, (err) => {
            console.error("Failed to load @floating-ui/core:", err);
            cb && cb(false);
        });
    }
};

(function () {
    bw.tour.init((tourData) => {
        if (tourData) {
            console.log("Tour initialized successfully!");
            console.log(tourData);
        } else {
            console.warn("Tour initialization failed.");
        }
    });
})();