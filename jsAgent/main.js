//CONSTANTS
const BW_SERVER_ENDPOINT_BASE = window.bwApiBaseUrl;
const BW_GET_GUIDE_LOG_URL = `${BW_SERVER_ENDPOINT_BASE}guide/get_incomplete_guides_by_url`;
const BW_ADD_GUIDE_LOG_URL = `${BW_SERVER_ENDPOINT_BASE}guide_log/add_guide_log`;
const BW_TOUR_DETAIL_JS_URL = `${BW_SERVER_ENDPOINT_BASE}tour/get_tour/`;
const BW_JS_BASE_URL = window.bwAgentBaseUrl;

const BW_POPUP_JS_URL = `${BW_JS_BASE_URL}popup.js`;
const BW_LINKS_JS_URL = `${BW_JS_BASE_URL}links.js`;
const BW_BANNER_JS_URL = `${BW_JS_BASE_URL}banner.js`;
const BW_TOUR_JS_URL = `${BW_JS_BASE_URL}tour.js`;
const BW_HINT_JS_URL = `${BW_JS_BASE_URL}hint.js`;

const BW_USER_KEY = "BW_USER_KEY";

//GLOBALS
window.BW_USER = "";
window.BW_LAST_URL = "";
if (window.bw === undefined) {
  window.bw = {};
}
if (bw.util === undefined) {
  bw.util = {};
}

bw.util = {
  isScriptLoaded: function (src) {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++)
      if (scripts[i].getAttribute("src") == src) return true;
    return false;
  },
  loadScriptAsync: function (url, cb, errcb) {
    try {
      if (bw.util.isScriptLoaded(url)) {
        cb && cb();
      } else {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = false;
        if (script.readyState) {
          script.onreadystatechange = function () {
            if (
              script.readyState == "loaded" ||
              script.readyState == "complete"
            ) {
              script.onreadystatechange = null;
              cb && cb();
            }
          };
        } else {
          script.onload = function () {
            cb && cb();
          };
        }
        script.onerror = function () {
          errcb && errcb();
        };
        script.src = url;
        (
          document.getElementsByTagName("head")[0] ||
          document.getElementsByTagName("body")[0]
        ).appendChild(script);
      }
    } catch (e) {
      console.log(e);
    }
  },
  bindLive: function (selector, event, cb, cnx) {
    bw.util.addEvent(cnx || document, event, function (e) {
      var qs = (cnx || document).querySelectorAll(selector);
      if (qs) {
        var el = e.target || e.srcElement,
          index = -1;
        while (el && (index = Array.prototype.indexOf.call(qs, el)) === -1)
          el = el.parentElement;
        if (index > -1) cb.call(el, e);
      }
    });
  },
  addEvent: function (el, type, fn) {
    if (el.attachEvent) el.attachEvent("on" + type, fn);
    else el.addEventListener(type, fn);
  },
  generateGUID: function () {
    var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (o) {
        var n = (Math.random() * 16) | 0,
          g = o == "x" ? n : (n & 3) | 8;
        return g.toString(16);
      }
    );
    return guid;
  },
};

bw.GuideType = Object.freeze({
  POPUP: 0,
  HINT: 1,
  BANNER: 2,
  LINK: 3,
  TOUR: 4,
  CHECKLIST: 5,
});

bw.data = {
  getData: async function (userId) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        userId,
        url: location.href.replace(/\/+$/, ""),
      }),
      redirect: "follow",
    };

    const response = await fetch(BW_GET_GUIDE_LOG_URL, requestOptions);
    const data = await response.json();
    return data;
  },
  sendData: async function (guideType, userId, completed = true, guideId) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        guideType,
        userId,
        completed: true,
        guideId,
      }),
    };

    const response = await fetch(BW_ADD_GUIDE_LOG_URL, requestOptions);
    const responseJson = await response.json();
    return responseJson;
  },
  getTourById: async function (tourId) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${BW_TOUR_DETAIL_JS_URL}${tourId}`,
        requestOptions
      );
      if (!response.ok) {
        console.log("Error fetching tour data:", response.status);
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching tour data:", error);
      return null;
    }
  },
};

bw.store = {
  insert: function (key, value) {
    localStorage.setItem(key, value);
  },
  remove: function (key) {
    localStorage.removeItem(key);
  },
  get: function (key) {
    return localStorage.getItem(key);
  },
};

bw.user = {
  createUser: function () {
    const generated_userId = bw.util.generateGUID();
    bw.store.insert(BW_USER_KEY, generated_userId);
    window.BW_USER = generated_userId;
  },
  checkIfBwUserCreated: function () {
    let result = false;
    let userID = bw.store.get(BW_USER_KEY);
    if (userID != null) {
      result = true;
    }
    return result;
  },
  getUserID: function () {
    return bw.store.get(BW_USER_KEY);
  },
  removeUser: function () {
    bw.store.remove(BW_USER_KEY);
  },
};

bw.loadGuides = async function () {
  try {
    const userId = window.BW_USER;
    const onBoardConfig = await bw.data.getData(userId);
    console.log("data loaded:", onBoardConfig);

    window.bwonboarddata = onBoardConfig;

    const baseUrl = (window.bwAgentBaseUrl || "").replace(/\/+$/, "");
    const urls = {
      popup: `${baseUrl}/popup.js`,
      tour: `${baseUrl}/tour.js`,
      banner: `${baseUrl}/banner.js`,
      links: `${baseUrl}/links.js`,
      hint: `${baseUrl}/hint.js`,
    };

    if (onBoardConfig.popup?.length) {
      bw.util.loadScriptAsync(urls.popup, () => {
        if (bw.popup?.init) bw.popup.init();
      });
    }
    if (onBoardConfig.tour?.length)
      bw.util.loadScriptAsync(urls.tour, () => {
        if (bw.tour?.init) bw.tour.init();
      });
    if (onBoardConfig.banner?.length)
      bw.util.loadScriptAsync(urls.banner, () => {
        if (bw.banner?.init) bw.banner.init();
      });
    if (onBoardConfig.helperLink?.length) bw.util.loadScriptAsync(urls.links);
    if (onBoardConfig.hint?.length) bw.util.loadScriptAsync(urls.hint);
  } catch (e) {
    console.log("loadGuides error:", e);
  }
};

bw.urlListener = {
  init: function () {
    window.addEventListener("bw-url-change", function (event) {
      console.log("URL changed:", event);
      bw.clearScreen();
      bw.loadGuides();
    });
    setInterval(() => {
      if (window.BW_LAST_URL === "") {
        window.BW_LAST_URL = location.href;
      } else if (window.BW_LAST_URL != location.href) {
        window.BW_LAST_URL = location.href;
        window.dispatchEvent(new Event("bw-url-change"));
      }
    }, 700);
  },
};

bw.init = (cb) => {
  const extUserId = window.bwUser && (window.bwUser._id || window.bwUser.id);
  if (extUserId) {
    bw.store.insert(BW_USER_KEY, String(extUserId));
  } else if (!bw.user.checkIfBwUserCreated()) {
    bw.user.createUser();
  }
  window.BW_USER = bw.user.getUserID();
  cb && cb();
};

bw.clearScreen = () => {
  //clear all banners, hints, tours, overlays, tooltips, etc
  const bw_classes = [
    "bw-tooltip-arrow",
    ".bw-banner",
    ".tooltip-cue",
    "[data-tooltip-position]",
    ".bw-tour-container",
    "bw-overlay",
  ];

  for (const bw_class of bw_classes) {
    const elements = document.querySelectorAll(bw_class);
    for (const element of elements) {
      element.remove();
    }
  }
};

(function () {
  bw.init(async function () {
    bw.urlListener.init();
    bw.loadGuides();
  });
})();
