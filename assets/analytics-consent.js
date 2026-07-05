(function () {
  var storageKey = "akumulatory_analytics_consent";
  var acceptedValue = "accepted";
  var rejectedValue = "rejected";
  var rejectionReminderMs = 24 * 60 * 60 * 1000;
  var umamiScriptSrc = "https://cloud.umami.is/script.js";
  var umamiWebsiteId = "0304e7de-a321-4985-9ac1-b251be5c31c3";
  var banner = document.getElementById("analytics-consent");
  var acceptButton = document.querySelector("[data-analytics-accept]");
  var rejectButton = document.querySelector("[data-analytics-reject]");
  var settingsButtons = document.querySelectorAll("[data-analytics-settings]");

  function getPreference() {
    var rawPreference;

    try {
      rawPreference = window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }

    if (!rawPreference) {
      return null;
    }

    try {
      return JSON.parse(rawPreference);
    } catch (error) {
      if (rawPreference === acceptedValue || rawPreference === rejectedValue) {
        return {
          value: rawPreference,
          rejectedAt: rawPreference === rejectedValue ? 0 : null
        };
      }
    }

    return null;
  }

  function setPreference(value) {
    var now = Date.now();
    var preference = {
      value: value,
      updatedAt: now
    };

    if (value === rejectedValue) {
      preference.rejectedAt = now;
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(preference));
    } catch (error) {
      return false;
    }

    return true;
  }

  function isRejectedPreferenceCurrent(preference) {
    return Boolean(
      preference &&
      preference.value === rejectedValue &&
      typeof preference.rejectedAt === "number" &&
      !isRejectedPreferenceExpired(preference)
    );
  }

  function isRejectedPreferenceExpired(preference) {
    return Date.now() - preference.rejectedAt >= rejectionReminderMs;
  }

  function hasUmamiLoaded() {
    return Boolean(document.querySelector('script[src="' + umamiScriptSrc + '"]'));
  }

  function loadUmami() {
    if (hasUmamiLoaded()) {
      return;
    }

    var script = document.createElement("script");
    script.defer = true;
    script.src = umamiScriptSrc;
    script.setAttribute("data-website-id", umamiWebsiteId);
    script.setAttribute("data-analytics-umami", "true");
    document.head.appendChild(script);
  }

  function showBanner() {
    if (banner) {
      banner.hidden = false;
    }
  }

  function hideBanner() {
    if (banner) {
      banner.hidden = true;
    }
  }

  function acceptAnalytics() {
    setPreference(acceptedValue);
    hideBanner();
    loadUmami();
  }

  function rejectAnalytics() {
    var hadLoadedUmami = hasUmamiLoaded();
    setPreference(rejectedValue);
    hideBanner();

    if (hadLoadedUmami) {
      window.location.reload();
    }
  }

  if (acceptButton) {
    acceptButton.addEventListener("click", acceptAnalytics);
  }

  if (rejectButton) {
    rejectButton.addEventListener("click", rejectAnalytics);
  }

  settingsButtons.forEach(function (button) {
    button.addEventListener("click", showBanner);
  });

  var preference = getPreference();

  if (preference && preference.value === acceptedValue) {
    loadUmami();
  } else if (!isRejectedPreferenceCurrent(preference)) {
    showBanner();
  }
}());
