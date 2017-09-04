(function(window, document) {

  'use strict'

  var FormStorage = (function(window) {

    function saveButtonHandler() {
      var $saveButton = document.querySelector('.js-form-save');

      if ($saveButton) {
        var $inputs = Array.from(document.querySelectorAll('[data-save-key]:not(.is-optional):not([type="checkbox"])'));
        var result = true;
        for (var i in $inputs) {
          var $input = $inputs[i];
          if (!$input.value) {
            result = false;
            break;
          }
        }

        if (result) {
          $saveButton.removeAttribute('disabled');
        } else {
          $saveButton.setAttribute('disabled', true);
        }
      }
    }

    function attachSaveDataEvent(eventName, inputs) {
      for (var i in inputs) {
        var $input = inputs[i];
        $input.addEventListener(eventName, Helpers.debounce(function(event) {
          saveButtonHandler()
          var localStorageKey = this.dataset['saveKey'];
          var value = this.type == 'checkbox' ? this.checked : this.value;
          if (this.dataset['deleteOnFalsy'] && !value) {
            localStorage.removeItem(localStorageKey);
          } else {
            localStorage.setItem(localStorageKey, value);
          }
        }, 500));
      }
    }

    return {

      loadInitialValue: function() {

        if (!localStorage.getItem('imagary.form-show-total')) {
          localStorage.setItem('imagary.form-show-total', 2);
        }

        if (!localStorage.getItem('imagary.form-max')) {
          localStorage.setItem('imagary.form-max', 3);
        }

        var inputs = Array.from(document.querySelectorAll('[data-save-key]'));
        for (var i in inputs) {
          var input = inputs[i];
          var eventName = input.type == 'checkbox' ? 'change' : 'input';
          var saveKey = input.dataset['saveKey'];
          var localValue = localStorage.getItem(saveKey);
          if (localValue) {
            if (input.type == 'checkbox') {
              input.checked = JSON.parse(localValue);
              eventName = 'change';
            } else {
              input.value = localValue;
            }
          }

          input.dispatchEvent(new Event(eventName));
        }
      },

      saveOnChange: function() {
        var formOnInput = Array.from(document.querySelectorAll('[data-save-key]:not([type="checkbox"])'));
        var formOnChange = Array.from(document.querySelectorAll('[type="checkbox"][data-save-key]'));
        attachSaveDataEvent('input', formOnInput);
        attachSaveDataEvent('change', formOnChange);
      }
    }

  })()

  window.FormStorage = FormStorage;

})(window, document)
