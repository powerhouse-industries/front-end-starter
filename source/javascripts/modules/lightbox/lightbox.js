/**
 * An example module
 */

var Lightbox = (function () {

  var template = 'templates/lightbox.html';

  /**
   * Show the lightbox
   */

  var show = function () {
    console.log('show');
  };

  /**
   * Hide the lightbox
   */

  var hide = function () {
    console.log('hide');
  };

  return {
    show: show,
    hide: hide
  };

})();
