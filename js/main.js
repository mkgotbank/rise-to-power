/* Rise to Power — bootstrap */
(function () {
  const RTP = window.RTP || {};
  function start() {
    if (!RTP.UI || !RTP.Engine) { console.error('Rise to Power failed to load.'); return; }
    RTP.UI.boot();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
