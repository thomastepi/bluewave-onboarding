console.log('hint.js is here!');


// "action": "no action",
// "url": "https://bluewavelabs.ca",
// "actionButtonUrl": "https://bluewavelabs.ca/",
// "actionButtonText": "Take me to subscription page",
// "tooltipPlacement": "top",
// "header": "subtitle subtitle",

// "headerColor": "#101828",
// "textColor": "#344054",
// "buttonBackgroundColor": "#b39ee1",
// "buttonTextColor": "#FFFFFF",




    
   // <h1 style="background-color: rgb(163, 211, 168); color: rgb(16, 24, 40); font-size: 2rem; margin-bottom: 1rem;">head</h1>


// Create and style the button
// const button = document.createElement('button');
// button.textContent = 'Great!';
// button.className = 'button';
// button.style.cssText = `
//   background-color: #8a70d6;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   padding: 0.75rem 2rem;
//   font-size: 1rem;
//   cursor: pointer;
//   float: right;
// `;

// // Add hover effect to the button
// button.addEventListener('mouseover', () => {
//   button.style.backgroundColor = '#7559c2';
// });
// button.addEventListener('mouseout', () => {
//   button.style.backgroundColor = '#8a70d6';
// });

bw.hint = {
    isMouseOverTooltip : false,
    isMouseOverContainer : false,
    init: function () {
        bw.hint.putHtml();
    },
    putHtml: function () {
        const hintData = window.bwonboarddata.hint;

        for (let i = 0; i < hintData.length; i++) {
            const item = hintData[i];
            console.log(item);
            
            const tooltip = bw.hint.generateTooltip(item);
            const header = bw.hint.generateHeader(item);
            tooltip.innerHTML = header + item.hintContent;

            tooltip.appendChild(header);
            document.body.appendChild(tooltip);

            tooltip.addEventListener('mouseenter', function (e) {
                clearInterval(tooltip.timer);
                e.target.style.visibility = 'visible';
            });

            tooltip.addEventListener('mouseleave', function (e) {
                tooltip.timer = setTimeout(() => {
                    e.target.style.visibility = 'hidden';
                }, 1500);
            });
            bw.hint.bindSelector(item.targetElement, tooltip);

        }

       
    },
    //this can be delete later
    positionTooltip: function(tooltip, tooltipOwner, tooltipArrow) {
        const containerRect = tooltipOwner.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        let top = containerRect.top - tooltipRect.height - 5; // 5px above
        let left = containerRect.left + (containerRect.width - tooltipRect.width) / 2; // Centered horizontally
        let arrowPosition = 'bottom';
        let tooltipPosition = 'top';
        if (top < 0) {
            arrowPosition = 'top';
            tooltipPosition = 'bottom';
        }
        if (left < 0) {
            arrowPosition = 'left';
            tooltipPosition = 'right';
        } else if (left + tooltipRect.width > viewportWidth) {
            arrowPosition = 'right';
            tooltipPosition = 'left';
        }

        
        if (tooltipPosition === 'top') {
            tooltip.style.top = '-87px';
            tooltip.style.left = '-27px';
        } else if (tooltipPosition === 'bottom') {
            tooltip.style.top = '38px';
            tooltip.style.left = '-27px';
        } else if (tooltipPosition === 'left') {
            tooltip.style.top = '-24px';
            tooltip.style.left = '-172px';
        } else if (tooltipPosition === 'right') {
            tooltip.style.top = '-24px';
            tooltip.style.left = '118px';
        }

        if(arrowPosition === 'bottom') {
            tooltipArrow.style.top = '100%';
            tooltipArrow.style.left = '50%';
            tooltipArrow.style.marginLeft = '-5px';
            tooltipArrow.style.borderColor = '#555 transparent transparent transparent';
        } else if(arrowPosition === 'top') {
            tooltipArrow.style.top = '-10px';
            tooltipArrow.style.left = '50%';
            tooltipArrow.style.marginLeft = '-5px';
            tooltipArrow.style.borderColor = 'transparent transparent #555 transparent';
        } else if(arrowPosition === 'left') {
            tooltipArrow.style.top = '50%';
            tooltipArrow.style.left = '-5px';
            tooltipArrow.style.marginTop = '-5px';
            tooltipArrow.style.borderColor = 'transparent #555 transparent transparent';
        } else if(arrowPosition === 'right') {
            tooltipArrow.style.top = '50%';
            tooltipArrow.style.left = '';
            tooltipArrow.style.right = '-10px';
            tooltipArrow.style.marginTop = '-5px';
            tooltipArrow.style.borderColor = 'transparent transparent transparent #555';
        }
    },
    generateTooltip: function (item) {
        const tooltip = document.createElement('div');
        tooltip.pos = item.tooltipPlacement;
        tooltip.timer = null;
        tooltip.positionTimer = null;
        //tooltip.innerHTML= item.hintContent;
        tooltip.style.cssText = `
            width: 391px;
            height: 200px;
            position: absolute;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            color: ${item.textColor};
        `;
        return tooltip;
    },
    generateHeader: function (item) {
        const header_temp = `<h1 style="background-color: ${item.headerBackgroundColor}; color: ${item.headerColor}; font-size: 2rem; margin-bottom: 1rem;">${item.header}</h1>`;

        return header_temp;
    },
    bindSelector: function (selector, tooltip) {
        const elements = document.querySelectorAll(selector);
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.addEventListener('mouseenter', function (e) {

                clearTimeout(tooltip.timer);
                clearTimeout(tooltip.positionTimer);
                toolbar.positionTimer = setTimeout(function() {

                    const position = e.target.getAttribute('data-tooltip-position') || 'top';

                    const rect = e.target.getBoundingClientRect();
                    switch (position) {
                        case 'top':
                            tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
                            tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 5}px`;
                            tooltip.style.transform = 'translateX(-50%)';
                            break;
                        case 'bottom':
                            tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
                            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                            tooltip.style.transform = 'translateX(-50%)';
                            break;
                        case 'left':
                            tooltip.style.left = `${rect.left + window.scrollX - tooltip.offsetWidth - 5}px`;
                            tooltip.style.top = `${rect.top + window.scrollY + rect.height / 2}px`;
                            tooltip.style.transform = 'translateY(-50%)';
                            break;
                        case 'right':
                            tooltip.style.left = `${rect.right + window.scrollX + 5}px`;
                            tooltip.style.top = `${rect.top + window.scrollY + rect.height / 2}px`;
                            tooltip.style.transform = 'translateY(-50%)';
                            break;
                    }

                    tooltip.style.visibility = 'visible';


                }, 500);

            });
            element.addEventListener('mouseleave', function (e) {
                tooltip.timer = setTimeout(() => {
                    tooltip.style.visibility = 'hidden';
                }, 1500);
            });
        }
    }

};

(async function () {
    bw.hint.init();
})();