(function() {

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == 'getLocalStorage') {
      sendResponse({data: window.localStorage.getItem(request.key)});
    }
  });

  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {

      var openedForm = parseInt((localStorage.getItem('imagary.form-show-total') || '0'), 10);

      // -- Populate sizing
      var sizing = {}
      for (i = 1; i <= openedForm; i++) {
        var to = localStorage.getItem('imagary.to--' + i);
        var from = localStorage.getItem('imagary.from--' + i);

        if (to && from) {
          sizing[to] = from;
        }
      }

      var isActive = localStorage.getItem('imagary.activate') == 'true';
      if (isActive) {
        var oldUrl = details.url;
        var newUrl = '';
        var redirect = false
        var suffix = [];

        for (var to in sizing) {
          var from = sizing[to];
          var regexSizing = new RegExp('/(' + from + ')/', 'gi');
          var rawMatchedSizing = oldUrl.match(regexSizing);
          var isWebp = oldUrl.indexOf('.webp') != -1;


          newUrl = oldUrl;

          if (rawMatchedSizing) {
            matchedSizing = rawMatchedSizing[0]
            newUrl = newUrl.replace(matchedSizing, '/' + to + '/');
            suffix.push(matchedSizing.replace(/\//g, ''));
            redirect = true;
            break;
          }
        }

        if (isWebp) {
          newUrl = newUrl.replace('.webp', '');
          suffix.push('webp');
          redirect = true;
        }

        if (redirect) {
          newUrl = newUrl.replace(/\?.*/, '') + (suffix.length > 0 ? '?o=' + suffix.join('_') : '' );
          return {
            redirectUrl: newUrl
          }
        }
      }
    },
    {urls: ["*://*.local.host:*/system4/*"]},
    ['blocking']
  );
})();
