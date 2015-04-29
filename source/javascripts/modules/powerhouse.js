(function () {

  /**
   * A vanilla JavaScript alternative to jQuery's $(document).on();
   *
   * @public
   * @param {object} el - The element being targetted
   * @param {string} eventName - The name of the event
   * @param {function} handler - The callback
   */
  return addEventListeners = function (el, eventName) {

    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function() {
        handler.call(el);
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
  return forEachElement = function (el, callback) {

    var el = document.querySelectorAll(selector);
    for (var i = 0; i < el.length; i++) {
      fn(el[i], i);
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
