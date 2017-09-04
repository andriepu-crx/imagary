(function(window, document) {

  'use strict'

  var FormView = (function(window) {

    return {

      setupShowForm: function() {
        var $addButton = document.querySelector('.js-duplicate-button');
        var maxForm = parseInt((localStorage.getItem('imagary.form-max') || 3), 10);

        $addButton.addEventListener('click', function() {
          var currentShowTotal = parseInt((localStorage.getItem('imagary.form-show-total') || 1), 10);
          if (currentShowTotal < maxForm) {
            currentShowTotal += 1;
            localStorage.setItem('imagary.form-show-total', currentShowTotal);
            var $form = document.querySelector('.js-form-mapping--' + currentShowTotal);
            $form.classList.remove('hidden');

            if (currentShowTotal == maxForm) {
              this.setAttribute('disabled', 'disabled');
              document.querySelector('.js-form-mapping--' + (currentShowTotal-1) + ' .js-delete-button').classList.add('hidden');
            }
            $form.querySelector('.js-delete-button').classList.remove('hidden');
          }
        });
      },
      setupHideForm: function() {
        var $deleteButtons = Array.from(document.querySelectorAll('.js-delete-button'));
        for (var i in $deleteButtons) {
          var $deleteButton = $deleteButtons[i];
          $deleteButton.addEventListener('click', function() {
            var currentShowTotal = parseInt((localStorage.getItem('imagary.form-show-total') || 1), 10);
            currentShowTotal = currentShowTotal - 1;
            localStorage.setItem('imagary.form-show-total', currentShowTotal);
            var index = this.dataset['index'];
            document.querySelector('.js-form-mapping--' + index).classList.add('hidden');
            document.querySelector('.js-duplicate-button').removeAttribute('disabled');

            if (currentShowTotal > 1) {
              document.querySelector('.js-form-mapping--' + currentShowTotal + ' .js-delete-button').classList.remove('hidden');
            }
          })
        }
      }
    }

  })()

  window.FormView = FormView;

})(window, document)
