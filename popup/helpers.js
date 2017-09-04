(function() {

  'use strict'

  var Helpers = (function() {

    var DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var MONTH = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    return {

      htmlToElement: function(html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
      },

      formatDate: function(date) {
        var selectedDate = new Date(date);
        var formattedDate = selectedDate.getFullYear().toString() + ('0' + (selectedDate.getMonth() + 1)).slice(-2) + ('0' + (selectedDate.getDate())).slice(-2);
        return formattedDate;
      },

      humanizeDate: function(date) {
        var selectedDate = new Date(date);
        var formattedDate = DAYS[selectedDate.getDay()] + ', ' + ('0' + (selectedDate.getDate())).slice(-2) + ' ' + MONTH[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear();
        return formattedDate;
      },

      executeFunctionByName: function(functionName, context) {
        context = context || window;
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split('.');
        var func = namespaces.pop();
        var idx = 0;
        if (context[namespaces[0]]) {
          while (idx < namespaces.length) {
            context = context[namespaces[idx]];
            idx++;
          }
          return context[func].apply(context, args);
        }
      },

      debounce: function(func, wait, immediate) {
        var timeout = null;
        var result = null;
        var later = function(context, args) {
          timeout = null;
          if (args) {
            return result = func.apply(context, args);
          }
        };
        var debounced = function() {
          var args, isCallNow;
          args = arguments;
          if (timeout) {
            clearTimeout(timeout);
          }
          if (immediate) {
            isCallNow = !timeout;
            timeout = setTimeout(later, wait);
            if (isCallNow) {
              result = func.apply(this, args);
            }
          } else {
            timeout = setTimeout(later, wait, this, args);
          }
          return result;
        };
        debounced.cancel = function() {
          clearTimeout(timeout);
          return timeout = null;
        };
        return debounced;
      }
    }
  })()

  window.Helpers = Helpers;

})()
