(function () {
  function assetBase() {
    const meta = document.querySelector('meta[name="asset-base"]');
    if (meta && meta.content) return meta.content.replace(/\/?$/, "/");
    const path = window.location.pathname;
    if (path.includes("/blog/") || path.includes("/work/")) return "../";
    return "./";
  }

  window.addEventListener("load", function () {
    const favicon = document.getElementById("favicon");
    if (!favicon) return;

    const base = assetBase();
    const pageTitle = document.title;
    const attentionMessage = "👋 Come back";
    const activeIcon = base + "assets/images/favicon.png";
    // Custom peeking / waving emoji favicon
    const awayIcon = base + "assets/images/come-back-favicon.svg";
    let blinkTimer = null;

    function setAway() {
      document.title = attentionMessage;
      favicon.type = "image/svg+xml";
      favicon.href = awayIcon + "?v=1";
    }

    function setActive() {
      document.title = pageTitle;
      favicon.type = "image/png";
      favicon.href = activeIcon;
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        setAway();
        clearInterval(blinkTimer);
        blinkTimer = setInterval(function () {
          if (!document.hidden) {
            clearInterval(blinkTimer);
            blinkTimer = null;
            setActive();
            return;
          }
          if (document.title === attentionMessage) {
            document.title = pageTitle;
            favicon.type = "image/png";
            favicon.href = activeIcon;
          } else {
            document.title = attentionMessage;
            favicon.type = "image/svg+xml";
            favicon.href = awayIcon + "?v=1";
          }
        }, 1000);
      } else {
        clearInterval(blinkTimer);
        blinkTimer = null;
        setActive();
      }
    });
  });
})();
