var PowerHouse = (function () {

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
   * @param {function} callback - The callback
   */
  var addEventListener = function (el, eventName, callback) {

    if (el.addEventListener) {
      el.addEventListener(eventName, callback);
    } else {
      el.attachEvent('on' + eventName, function() {
        callback.call(el);
      });
    }

  };

  /**
   * A vanilla JavaScript alternative to jQuery's $(el).each();
   *
   * @public
   * @param {object} el - The element being targetted
   * @param {function} handler - The callback
   */
  var forEachElement = function (el, callback) {

    for (var i = 0; i < el.length; i++) {
      callback(el[i], i);
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

  return {
    ready : ready,
    addEventListener : addEventListener,
    forEachElement : forEachElement,
    getFileContents : getFileContents
  };

})();
