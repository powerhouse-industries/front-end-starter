/**
 * A series of helper methods that can
 * be reused across a project.
 */

var Helpers = (function () {

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

  return {
    ready: ready
  };

})();
