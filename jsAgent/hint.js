console.log('hint.js is here!');

const hintsDefaultOptions = {
    action: "no action",
    url: "https://www.google.com",
    actionButtonUrl: "https://www.google.com",
    actionButtonText: "go google",
    targetElement: ".element",
    tooltipPlacement: "top",
    hintContent: "<p>content</p>",
    header: "hiiint",
    headerBackgroundColor: "#cea2a2",
    headerColor: "#101828",
    textColor: "#344054",
    buttonBackgroundColor: "#7F56D9",
    buttonTextColor: "#FFFFFF",
};



bw.hint = {
    init: function () {
        bw.hint.putHtml();
    },
    putHtml: function () {
        const hintData = window.bwonboarddata.hint;

        for (let i = 0; i < hintData.length; i++) {
            const item = hintData[i];
            item.targetElement = ".accordion-header";       
            
            let tooltipOwners = document.querySelectorAll(item.targetElement);
            for (let j = 0; j < tooltipOwners.length; j++) {
                const tooltipOwner = tooltipOwners[j];

                // Create the tooltip element
                const tooltip = document.createElement('div');
                tooltip.innerHTML = 'This is a custom tooltip!';
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = '#555';
                tooltip.style.color = '#fff';
                tooltip.style.padding = '5px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.textAlign = 'center';
                tooltip.style.width = '120px';
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
                tooltip.style.transition = 'opacity 0.3s';
                tooltip.style.zIndex = '1';
                
                const tooltipArrow = document.createElement('div');
                tooltipArrow.style.content = '""';
                tooltipArrow.style.position = 'absolute';
                tooltipArrow.style.borderWidth = '5px';
                tooltipArrow.style.borderStyle = 'solid';
                tooltipArrow.style.width = '0';
                tooltipArrow.style.height = '0';
                
                tooltip.appendChild(tooltipArrow);
                tooltipOwner.appendChild(tooltip);   

                console.log("tooltipOwner added");
                
            
            }
            
            

        
          
            
            
        }
    },
    

};

(async function () {
    bw.hint.init();
})();