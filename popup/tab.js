(function() {

  'use strict'

  document.addEventListener('DOMContentLoaded', function(event) {

    var $tabContentContainer = document.querySelector('.js-tab-content-container');
    var $tabTitles = Array.from(document.querySelectorAll('.js-tab-title[data-show]'));

    if ($tabTitles.length) {
      $tabTitles.forEach(function($tabTitle) {

        $tabTitle.addEventListener('click', function(event) {

          if (!this.classList.contains('is-active')) {
            localStorage.setItem('imagary.active-tab', $tabTitles.indexOf(this));

            var $currentActiveTab = document.querySelector('.js-tab-title.is-active')
            $currentActiveTab && $currentActiveTab.classList.remove('is-active');

            this.classList.add('is-active');

            var view = this.dataset['show'];
            var url = chrome.extension.getURL('/popup/partial/' + view);

            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function() {
              if (request.status >= 200 && request.status < 400) {
                var resp = request.responseText;
                $tabContentContainer.innerHTML = resp;

                var $dataJSToInit = $tabContentContainer.querySelector('[data-js-init]');

                if ($dataJSToInit) {
                  var jsListToInit = JSON.parse($dataJSToInit.dataset['jsInit']);
                  for (var i in jsListToInit) {
                    Helpers.executeFunctionByName(jsListToInit[i]);
                  }
                }
              }
            };
            request.send();
          }
        });
      });

      var activeTab = window.localStorage.getItem('imagary.active-tab') || '0';
      $tabTitles[activeTab].click();
    }

  });

})()
