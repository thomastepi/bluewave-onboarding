const popupDefaultOptions = {
  padding: 20,
  overlayOpacity: "48",
  overlayBlur: 0,
  closeButtonAction: "no action",
  popupSize: "small",
  url: "/",
  actionButtonText: "Take me to subscription page",
  actionButtonUrl: "",
  headerBackgroundColor: "#F8F9F8",
  headerColor: "#101828",
  textColor: "#344054",
  buttonBackgroundColor: "#7F56D9",
  buttonTextColor: "#FFFFFF",
  header: "default",
  content: "",
};

const PopUpSize = Object.freeze({
  small: { width: 400, height: 250 },
  medium: { width: 500, height: 300 },
  large: { width: 700, height: 350 },
});

bw.popup = {
  init: async function () {
    const all = (window.bwonboarddata && window.bwonboarddata.popup) || [];
    if (!all.length) return;

    const currentPath = (location.pathname || "/").replace(/\/+$/, "") || "/";
    const pagePopups = all.filter((item) => {
      if (!item || !item.url) return false;
      if (item.url === "*") return true;
      const popupPath =
        new URL(item.url, location.origin).pathname.replace(/\/+$/, "") || "/";
      return popupPath === currentPath;
    });

    if (!pagePopups.length) return;

    const options = { ...popupDefaultOptions, ...pagePopups[0] };

    this.addOverlay(options.overlayOpacity);
    await this.addModal(options);
  },

  addOverlay: function (opacity) {
    // remove any existing overlay to prevent duplicates
    const old = document.getElementById("bw-overlay");
    if (old) old.remove();

    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div id="bw-overlay" style="
        position: fixed !important; top: 0 !important; left: 0 !important;
        width: 100% !important; height: 100% !important;
        background-color: rgba(0, 0, 0, 0.${opacity}) !important;
        z-index: 999 !important;"></div>`
    );
  },

  addModal: async function (option) {
    const overlay = document.getElementById("bw-overlay");
    const size = PopUpSize[option.popupSize] || PopUpSize.small;

    const temp_html = `
      <div id="bw-modal" style="
        position: fixed !important; top: 180px !important; left: 50% !important;
        transform: translate(-50%, -50%) !important; width: ${
          size.width
        }px !important;
        height: ${
          size.height
        }px !important; display: block !important; z-index: 1000 !important;
        box-sizing: border-box !important; padding-top: 100px !important; background-color: rgb(255 255 255 / 0%) !important;">
        <div class="modal-content" style="
          border-radius: 4px !important; position: relative !important; margin: auto !important;
          padding: 0 !important; border: 1px solid #F0F0F0 !important; background-color: white !important;
          box-shadow: 2px 2px 10px 0px #0000000D !important;">
          ${bw.popup.addHeader(
            option.header,
            option.headerBackgroundColor,
            option.headerColor,
            option.padding
          )}
          <div class="modal-body" style="
            padding: ${option.padding}px ${
      option.padding
    }px !important; display: flex !important;
            justify-content: space-between !important; flex-direction: column !important; box-sizing: border-box !important;
            font-family: 'Inter', sans-serif !important; font-size: 13px !important; min-height: 227px !important;">
            ${option.content}
            ${
              option.closeButtonAction !== "no action"
                ? bw.popup.addButton(
                    option.actionButtonText,
                    option.buttonBackgroundColor,
                    option.buttonTextColor,
                    option.padding,
                    "bw-popup-btn"
                  )
                : ""
            }
          </div>
        </div>
      </div>`;

    overlay.insertAdjacentHTML("afterbegin", temp_html);

    // record completion for this popup
    try {
      await bw.data.sendData(
        bw.GuideType.POPUP,
        bw.user.getUserID(),
        true,
        option.id
      );
    } catch {}

    this.bindEvents(option.closeButtonAction, option.actionButtonUrl);
  },

  addHeader: function (headerTitle, bgColor, textColor, padding) {
    return `
      <div class="modal-header" style="
        height:57px !important; margin:auto !important; font-weight:bold !important;
        padding:0 ${padding}px !important; background-color:${bgColor} !important; display:flex !important;
        justify-content:space-between !important; align-items:center !important; border-bottom:1px solid #D0D5DD !important;">
        <h2 style="font-family:'Inter',sans-serif !important; font-size:20px !important; font-weight:500 !important; color:${textColor} !important; margin:0;">
          ${headerTitle}
        </h2>
        <svg id="bw-modal-close" viewBox="0 0 24 24" style="fill:#98A2B3 !important; font-size:20px !important; position:absolute !important; right:23px !important; cursor:pointer !important; width:20px !important; height:20px !important;">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </div>`;
  },

  addButton: function (text, bgColor, textColor, padding, btnId) {
    return `
      <div class="modal-button-container" style="display:flex !important; justify-content:flex-end !important; margin-top:16px !important;">
        <button id="${btnId}" style="
          color:${textColor} !important; background-color:${bgColor} !important; border-radius:8px !important; cursor:pointer !important;
          transition:background-color .3s, border-color .3s !important; min-width:64px !important; padding:6px 16px !important; border:0 !important;
          font-family:Inter !important; font-weight:500 !important; font-size:13px !important; line-height:1.75 !important;">
          ${text}
        </button>
      </div>`;
  },

  bindEvents: function (btnEvent, btnLink) {
    const closeEl = document.getElementById("bw-modal-close");
    closeEl && closeEl.addEventListener("click", () => bw.popup.hideModal());

    const button = document.getElementById("bw-popup-btn");
    if (button) {
      button.addEventListener("click", () => {
        if (btnEvent === "no action") {
          bw.popup.hideModal();
          return;
        }
        if (!btnLink) return;

        const href = new URL(btnLink, location.origin).href;

        if (btnEvent === "open url in a new tab") {
          window.open(href, "_blank", "noopener");
        } else if (btnEvent === "open url") {
          window.location.assign(href);
        }
      });

      button.addEventListener("mouseenter", (e) => {
        e.target.style.boxShadow =
          "0px 2px 4px -1px rgba(0,0,0,.2), 0px 4px 5px 0 rgba(0,0,0,.14), 0px 1px 10px 0 rgba(0,0,0,.12)";
      });
      button.addEventListener("mouseleave", (e) => {
        e.target.style.boxShadow = "none";
      });
    }
  },

  hideModal: function () {
    const ov = document.getElementById("bw-overlay");
    if (ov) ov.remove();
  },
};

(async function () {
  bw.popup.init();
})();
