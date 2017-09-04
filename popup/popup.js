document.addEventListener('DOMContentLoaded', function(event) {

  var $sizingEl = document.getElementById('sizing');
  var $activateEl = document.getElementById('activate');

  var localSizing = window.localStorage.getItem('bl-iamgary.sizing');
  var localActive = window.localStorage.getItem('bl-iamgary.activate');

  function initDefaultSettings() {
    var sizing = localSizing || 's-200-200|s-194-194|s-178-178|w-300';
    var isActive = !localActive || localActive == 'true';
    $sizingEl.value = sizing;
    $activateEl.checked = isActive;

  }

  $sizingEl.addEventListener('change', function(e) {
    window.localStorage.setItem('bl-iamgary.sizing', $sizingEl.value);
  });

  $activateEl.addEventListener('change', function(e) {
    window.localStorage.setItem('bl-iamgary.activate', e.target.checked);
  });

  function saveInitData() {
    $sizingEl.dispatchEvent(new Event('change'));
    $activateEl.dispatchEvent(new Event('change'));
  }

  function initPopup() {
    initDefaultSettings();
    saveInitData();
  }

  initPopup();

});
