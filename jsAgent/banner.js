let temp_banner_html = `
<div class="bw-banner" id="bw-banner-{{id}}" data-id="{{dataId}}" data-action="{{closeAction}}"
data-url="{{url}}" data-navUrl="{{navUrl}}"
     style="position:absolute !important; {{position}}:25px !important; z-index:999999 !important;
            background-color: {{backgroundColor}} !important; left: calc(50% - 435px / 2) !important;
            line-height:13px !important; font-weight:400 !important; display:flex !important;
            align-items:center !important; justify-content:space-between !important; border-radius:5px !important;
            max-width:435px !important; box-shadow:0px 2px 7px 0px #0000001F; border:1px solid #D0D5DD; padding: 0 15px !important;">
  <div style="color:{{textColor}} !important; width:100% !important; text-align:center !important;
              font-family:Inter !important; font-size:14px !important; font-weight:400 !important;
              line-height:24px !important; text-underline-position:from-font !important;
              text-decoration-skip-ink:none !important;">
    {{content}}
  </div>
  <svg class="bw-banner-close-icon" aria-hidden="true" viewBox="0 0 24 24"
       style="fill:{{textColor}} !important; font-size:20px !important; cursor:pointer !important;
              width:23px !important; height:23px !important;">
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  </svg>
</div>`;

bw.banner = {
  init: function () {
    bw.banner.putHtml();
    bw.banner.bindClick();
  },
  putHtml: async function () {
    const all = (window.bwonboarddata && window.bwonboarddata.banner) || [];
    if (!all.length) return;

    // current page path, normalized
    const currentPath = location.pathname;

    const pageBanners = all.filter((item) => {
      if (!item || !item.url) return false;
      if (item.url === "*") return true;
      const bannerPath =
        new URL(item.url, location.origin).pathname;
      return bannerPath === currentPath;
    });

    if (!pageBanners.length) return;

    let bannerHtml = "";
    for (let i = 0; i < pageBanners.length; i++) {
      const item = pageBanners[i];
      let temp_html = ``;
      temp_html = temp_banner_html.replace(
        new RegExp("{{backgroundColor}}", "g"),
        item.backgroundColor
      );
      temp_html = temp_html.replace(
        new RegExp("{{position}}", "g"),
        item.position
      );
      temp_html = temp_html.replace(
        new RegExp("{{textColor}}", "g"),
        item.fontColor
      );
      temp_html = temp_html.replace(
        new RegExp("{{content}}", "g"),
        item.bannerText
      );
      temp_html = temp_html.replace(new RegExp("{{dataId}}", "g"), item.id);
      temp_html = temp_html.replace(new RegExp("{{id}}", "g"), i);
      temp_html = temp_html.replace(
        new RegExp("{{closeAction}}", "g"),
        item.closeButtonAction || "none"
      );
      temp_html = temp_html.replace(
        new RegExp("{{navUrl}}", "g"),
        item.actionUrl || ""
      );
      temp_html = temp_html.replace(
        new RegExp("{{url}}", "g"),
        item.url || ""
      );
      bannerHtml += temp_html;
    }
    if (bannerHtml) {
      document.body.insertAdjacentHTML("afterbegin", bannerHtml);
    }
  },
  bindClick: function () {
    const closeBtns = document.getElementsByClassName("bw-banner-close-icon");
    for (let i = 0; i < closeBtns.length; i++) {
      const el = closeBtns[i];
      el.addEventListener("click", async function () {
        const banner = document.getElementById("bw-banner-" + i);
        const dataId = banner.getAttribute("data-id");
        const action = banner.getAttribute("data-action");
        const url = banner.getAttribute("data-url");
        const navUrl = banner.getAttribute("data-navUrl");
        
        banner.style.display = "none";

        if (action === "open url" && navUrl) {
          if (navUrl.startsWith("http") || navUrl.startsWith("https")) {
            window.location.assign(navUrl);
          } else {
            window.location.href = navUrl;
          }
        } else if (action === "open url in a new tab" && navUrl) {
          window.open(navUrl, "_blank", "noopener");
        }

        try {
          bw.data.sendData(
            bw.GuideType.BANNER,
            bw.user.getUserID(),
            true,
            dataId
          );
        } catch (e) {
        }
      });
    }
  },
};

(async function () {
  bw.banner.init();
})();
