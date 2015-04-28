(function () {

  var request, template, element, type, handler;

  /**
   * A vanilla JavaScript alternative to jQuery's $(el);
   *
   * @public
   * @param {object} el - The element being targetted
   */
  return $ = function (el) {

    var el = document.querySelectorAll(el);
    return el;

  };

  /**
   * A vanilla JavaScript alternative to jQuery's $(document).on();
   *
   * @public
   * @param {object} el - The element being targetted
   * @param {string} eventName - The name of the event
   * @param {function} handler - The callback
   */
  return addEventListeners = function () {

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
  return getFileContents = function (file, callback) {

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

})();
