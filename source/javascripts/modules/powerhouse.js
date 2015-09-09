var PowerHouse = (function () {

  /**
   * A vanilla JavaScript alternative to jQuery's $(document).ready();
   *
   * @public
   * @param {Function} callback - The function to be executed when the document is ready
   */
  var ready = function (callback) {

    if (document.readyState != 'loading') {
      callback();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState != 'loading') {
          callback();
        }
      });
    }

  };

  /**
   * A vanilla JavaScript alternative to jQuery's $(document).on();
   *
   * @public
   * @param {Object} el - The element being targetted
   * @param {String} eventName - The name of the event
   * @param {Function} callback - The callback
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
   * A vanilla JS alternative to $().next()
   *
   * @public
   * @param {Object} el - The element being targetted
   */
  var nextElementSibling = function(el) {

    do { el = el.nextSibling; } while (el && el.nodeType !== 1);
    return el;

  };

  /**
   * A vanilla JS alternative to $().each();
   *
   * @public
   * @param {String} selector - The element being targetted
   * @param {Function} callback - The callback
   */
  var forEachElement = function (selector, callback) {

    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      callback(elements[i], i);
    }

  };

  /**
   * A vanilla JS alternative to $().hasClass();
   *
   * @public
   * @param {Object} el - The element being targetted
   * @param {String} className - The class name to query
   */
  var hasClass = function (el, className) {

    return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);

  };

  /**
   * Get the contents of a file on the same domain
   *
   * @public
   * @param {String} file - The url of the file
   * @param {Function} success - The name of the event
   */
  var getFileContents = function (file, success, error) {

    // Detect whether XMLHttpRequest is supported
    if (!window.XMLHttpRequest) {
      return;
    }

    // Create a new request
    var request = new XMLHttpRequest();

    // Setup callbacks
    request.onreadystatechange = function () {

      // If the request is completed
      if (this.readyState === 4) {

        // If the request failed
        if (request.status !== 200) {
          if (error && typeof(error) === 'function') {
            error(request.responseText, request);
          }
          return;
        }

        // If the request was successful
        if (success && typeof(success) === 'function') {
          success(request.responseText, request);
        }
      }
    };

    // Send the HTML
    request.open('GET', file, true);
    request.send();

  };

  /**
   * A vanilla JS alternative to $().insertAfter();
   *
   * @public
   * @param {String} newNode - The HTML to insert
   * @param {Function} referenceNode - The node to insert after
   */
  var insertAfter = function (newNode, referenceNode) {

    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);

  };

  /**
   * Get the positon of an element on the page
   *
   * @public
   * @param {Object} el - The element being targetted
   */

  var getOffsetRect = function (el) {

    /**
     * 1. Get the enclosing rectangle
     */
    var box = el.getBoundingClientRect();

    var body = document.body;
    var docElement = document.documentElement;

    /**
     * 2. Calculate the page scroll. All browsers except IE<9 support `pageXOffset/
     *    pageYOffset`, and in IE when DOCTYPE is set, the scroll can be taken from
     *    documentElement(<html>), otherwise from `body` - so we take what we can.
     */
    var scrollTop = window.pageYOffset || docElement.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElement.scrollLeft || body.scrollLeft;

    /**
     * 3. The document (`html` or `body`) can be shifted from left-upper corner in
     *     IE. Get the shift.
     */
    var clientTop = docElement.clientTop || body.clientTop || 0;
    var clientLeft = docElement.clientLeft || body.clientLeft || 0;

    /**
     * 4. Add scrolls to window-relative coordinates and substract the shift of
     *    `html/body` to get coordinates in the whole document.
     */
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
      top: Math.round(top),
      left: Math.round(left)
    };

  };

  return {
    ready: ready,
    addEventListener: addEventListener,
    forEachElement: forEachElement,
    hasClass: hasClass,
    nextElementSibling: nextElementSibling,
    getFileContents: getFileContents,
    insertAfter: insertAfter,
    getOffsetRect: getOffsetRect
  };

})();
