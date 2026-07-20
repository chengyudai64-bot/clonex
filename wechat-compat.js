(function () {
  var ua = navigator.userAgent || '';
  var isWechat = /MicroMessenger/i.test(ua);
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  if (isWechat) document.documentElement.classList.add('wechat-browser');
  if (isMobile) document.documentElement.classList.add('mobile-browser');

  var style = document.createElement('style');
  style.textContent = [
    'html,body,#root{width:100%;min-height:100%;margin:0;background:#000}',
    'html.wechat-browser,html.wechat-browser body{height:100%;overflow-x:hidden;-webkit-text-size-adjust:100%;touch-action:pan-y}',
    'html.wechat-browser body{padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}',
    '.wechat-webgl-fallback{position:fixed;z-index:999999;inset:0;background:#050505;color:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;font-family:Arial,sans-serif}',
    '.wechat-webgl-fallback video{position:absolute;width:100%;height:100%;object-fit:cover;opacity:.72}',
    '.wechat-webgl-fallback:after{content:"";position:absolute;inset:0;background:radial-gradient(circle,transparent,#000 85%)}',
    '.wechat-webgl-fallback div{position:relative;z-index:1;text-align:center;padding:24px}',
    '.wechat-webgl-fallback b{display:block;font-size:18vw;line-height:.85;letter-spacing:-.09em}',
    '.wechat-webgl-fallback b i{color:#f21;font-style:normal}',
    '.wechat-webgl-fallback p{font-size:12px;letter-spacing:.15em;line-height:1.7}'
  ].join('');
  document.head.appendChild(style);

  function unlockMedia() {
    document.querySelectorAll('audio,video').forEach(function (media) {
      if (media.muted || media.tagName === 'AUDIO') {
        var promise = media.play();
        if (promise && promise.catch) promise.catch(function () {});
      }
    });
  }
  document.addEventListener('WeixinJSBridgeReady', unlockMedia, false);
  document.addEventListener('touchstart', unlockMedia, { once: true, passive: true });
  document.addEventListener('click', unlockMedia, { once: true });

  function hasWebGL() {
    try {
      var canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (_) { return false; }
  }
  if (isWechat && !hasWebGL()) {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.innerHTML = '<main class="wechat-webgl-fallback"><video autoplay muted loop playsinline webkit-playsinline src="front/videos/loop1_60fps.mp4"></video><div><b>CLONE<i>X</i></b><p>RTFKT AVATAR PROJECT<br>请在系统浏览器中打开以体验完整 3D 场景</p></div></main>';
    });
  }
})();
