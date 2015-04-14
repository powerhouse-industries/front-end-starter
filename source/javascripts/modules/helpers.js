var Helpers = (function () {

  var request,
      template,
      element,
      type,
      handler;

  /**
   * A vanilla JavaScript alternative to jQuery's $(document).ready();
   *
   * @public
   * @param {function} fn - The function to be executed when the document is ready
   * @returns {function}
   */
  var ready = function (fn) {

    if (document.readyState != 'loading') {
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState != 'loading') {
          fn();
        }
      });
    }

  };

  /**
   * A vanilla JavaScript alternative to jQuery's $(document).on();
   *
   * @public
   * @param {object} el - The element being targetted
   * @param {string} eventName - The name of the event
   * @param {function} handler - The callback
   */
  var addEventListener = function (el, eventName, handler) {

    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function() {
        handler.call(el);
      });
    }

  };

  /**
   * Get the contents of a file
   *
   * @public
   * @param {string} file - The url of the file
   * @param {function} callback - The name of the event
   * @returns {string}
   */
  var getFileContents = function (file, callback) {

    request = new XMLHttpRequest();
    request.open('GET', file, true);

    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          callback(this.responseText);
        }
      }
    };

    request.send();
    request = null;

  };

  /**
   * Get the contents of a file
   *
   * @public
   * @param {src} file - The url of the JavaScript file
   * @param {function} callback - The callback
   */
  var loadJS = function (src, cb) {

    var ref = window.document.getElementsByTagName('script')[0],
        script = window.document.createElement('script');

    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);

    if (cb && typeof(cb) === 'function') {
      script.onload = cb;
    }

    return script;

  };

  return {
    ready: ready,
    addEventListener: addEventListener,
    getFileContents: getFileContents,
    loadJS: loadJS
  };

})();
