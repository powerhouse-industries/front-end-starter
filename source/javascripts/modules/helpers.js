var Helpers = (function () {

  var request,
      template,
      element,
      type,
      handler;

  /**
   * A vanilla JS alternative to $(document).ready();
   */

  var ready = function (fn) {

    if (document.readyState != 'loading'){
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState != 'loading')
          fn();
      });
    }

  };


  /**
   * A vanilla JS alternative to $().on();
   */

  var addEventListener = function(el, eventName, handler) {

    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function(){
        handler.call(el);
      });
    }

  };


  /**
   * Get contents of file
   */

  var getFileContents = function(template, callback) {

    request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        callback(request.responseText);
      }
    };
    request.open('GET', template, true);
    request.send();

  };

  return {
    ready: ready,
    addEventListener: addEventListener,
    getFileContents: getFileContents
  };

})();
