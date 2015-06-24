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
   * A vanilla JS alternative to $().next()
   */

  var nextElementSibling = function(el) {

    do { el = el.nextSibling; } while (el && el.nodeType !== 1);
    return el;

  };

  /**
   * A vanilla JS alternative to $().each();
   */
  var forEachElement = function (selector, fn) {

    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      fn(elements[i], i);
    }

  };

  /**
   * A vanilla JS alternative to $().hasClass()
   */
  var hasClass = function (el, className) {

    return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);

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
   * A vanilla JS alternative to $().insertAfter()
   */
  var insertAfter = function (newNode, referenceNode) {

    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);

  };

  /**
   * Get the positon of an element on the page
   *
   * 1. Get the enclosing rectangle.
   * 2. Calculate the page scroll. All browsers except IE<9 support `pageXOffset/pageYOffset`, and in IE when DOCTYPE is set, the scroll can be taken from documentElement(<html>), otherwise from `body` - so we take what we can.
   * 3. The document (`html` or `body`) can be shifted from left-upper corner in IE. Get the shift.
   * 4. Add scrolls to window-relative coordinates and substract the shift of `html/body` to get coordinates in the whole document.
   */

  var getOffsetRect = function (el) {
    /* 1 */
    var box = el.getBoundingClientRect();

    var body = document.body;
    var docElement = document.documentElement;

    /* 2 */
    var scrollTop = window.pageYOffset || docElement.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElement.scrollLeft || body.scrollLeft;

    /* 3 */
    var clientTop = docElement.clientTop || body.clientTop || 0;
    var clientLeft = docElement.clientLeft || body.clientLeft || 0;

    /* 4 */
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
      top: Math.round(top),
      left: Math.round(left)
    }
  }

  return {
    ready : ready,
    addEventListener : addEventListener,
    forEachElement : forEachElement,
    hasClass : hasClass,
    nextElementSibling : nextElementSibling,
    getFileContents : getFileContents,
    insertAfter: insertAfter,
    getOffsetRect: getOffsetRect
  };

})();
