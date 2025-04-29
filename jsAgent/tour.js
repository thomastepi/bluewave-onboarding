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
    showTour: function (tourData) {
        if (!tourData) {
            console.error('No tour data provided');
            return;
        }
        for(let i = 0; i < tourData.steps.length; i++){
            this.generateDialog(tourData.steps[i]);
        }
        this.showDialog(0, tourData);
    },
    generateDialog: function (dialogItem) {
        // Create container
        const container = document.createElement('div');
        container.className = 'container';
        container.style.cssText = `
            background-color: white;
            border-radius: 8px;
            box-shadow: 2px 2px 10px 0px #0000000D;
            position: relative;
            max-width: 400px; /* Set maximum width */
            width: 90%; /* Ensure it scales down on smaller screens */
          `;
        document.body.appendChild(container);

        // Create header
        const header = document.createElement('div');
        header.className = 'header';
        header.style.cssText = `
            display: flex; /* Use flexbox for alignment */
            align-items: center; /* Vertically center content */
            justify-content: space-between; /* Distribute space between h2 and close button */
            padding: 20px;
          `;
        container.appendChild(header);

        // Create heading (h2)
        const div = document.createElement('div');
        div.textContent = 'Projects';
        div.style.cssText = `
                margin: 0;
            font-size: 20px;
            font-family: "Inter";
            font-weight: 600;
            `;
        header.appendChild(div);

        // Create close button

        const closeButton = document.createElement('svg');
        closeButton.className = 'close-button';
        closeButton.setAttribute('focusable', 'false');
        closeButton.setAttribute('viewBox', "0 0 24 24");
        closeButton.style.cssText = `
            fill: rgb(152, 162, 179) !important; 
            font-size: 20px !important; 
            display: block !important; 
            position: absolute !important; 
            float: right !important; 
            right: 23px !important; 
            cursor: pointer !important; 
            width: 20px !important; 
            height: 20px !important; 
            display: inline-block !important; 
            margin: auto !important;
          `;
        const path = document.createElement('path');
        path.setAttribute('d', "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");

        closeButton.appendChild(path);

        closeButton.onclick = closeContainer;
        header.appendChild(closeButton);


        // Create paragraph
        const p = document.createElement('p');
        p.textContent = 'A project is a single instance of a Wave popup where you can add as many categories and commands. You have already created one, so we are good to go!';
        p.style.cssText = `
            margin: 0px 20px 20px;
            font-family: 'Inter';
            font-size: 13px;
            font-weight: 400;
            color: #344054;
          `;
        container.appendChild(p);

        // Create pagination
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        pagination.style.cssText = `
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
          `;
        container.appendChild(pagination);

        // Create indicators
        const numIndicators = 3;
        const indicators = [];
        for (let i = 0; i < numIndicators; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.style.cssText = `
              width: 23px;
              height: 5px;
              margin: 0 5px;
              border-radius: 2px;
              background-color: #ddd;
              cursor: pointer;
            `;
            if (i === 0) {
                indicator.classList.add('active');
                indicator.style.cssText += `background-color: #673ab7;`;
            }
            pagination.appendChild(indicator);
            indicators.push(indicator);
        }

        // Create footer (buttons container)
        const footer = document.createElement('div');
        footer.className = 'footer';
        footer.style.cssText = `
            display: flex;
            justify-content: flex-end;
            background-color: #f8f8f8;
            border-top: 1px solid #ddd;
            padding: 15px 20px 15px 15px;
            width: 100%;
            box-sizing: border-box;
          `;
        container.appendChild(footer);

        // Create back button
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.textContent = 'Back';
        backButton.style.cssText = `
            background-color: #eee;
            color: #333;
            margin-right: 10px;
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            min-width: 128px;
          `;
        backButton.addEventListener('click', handleBack);
        footer.appendChild(backButton);

        // Create next button
        const nextButton = document.createElement('button');
        nextButton.className = 'next-button';
        nextButton.textContent = 'Next';
        nextButton.style.cssText = `
            background-color: #673ab7;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            min-width: 128px;
          `;
        nextButton.addEventListener('click', handleNext);
        footer.appendChild(nextButton);

        let currentPage = 0;

        function setActiveIndicator(index) {
            indicators.forEach(indicator => indicator.style.backgroundColor = '#ddd');
            indicators[index].style.backgroundColor = '#673ab7';
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                setActiveIndicator(index);
                currentPage = index;
                console.log(`Navigated to page ${currentPage + 1}`);
                // Add page content update logic here
            });
        });

        function handleBack() {
            currentPage = Math.max(0, currentPage - 1);
            setActiveIndicator(currentPage);
            console.log("Back button clicked, now on page " + (currentPage + 1));
            // Add page content update logic here
        }

        function handleNext() {
            currentPage = Math.min(indicators.length - 1, currentPage + 1);
            setActiveIndicator(currentPage);
            console.log("Next button clicked, now on page " + (currentPage + 1));
            // Add page content update logic here
        }

        function closeContainer() {
            container.style.display = 'none'; // Or container.remove();
        }
    },
    showDialog: function (index, tourData) {
        this.generateDialog(tourData.steps[index]);
        //this.showTour(tourData);
    },
    /**
     * Loads floating-ui libraries asynchronously.
     * @param {function(object): void} cb - Callback function, called with the tour options object.
     * @param {function(): void} errCb - Callback function, called on error.
     * @returns {void}
     */
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
            bw.tour.showTour(tourData);
        } else {
            console.warn("Tour initialization failed.");
        }
    });
})();