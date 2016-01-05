PowerHouse.ready(function () {

  /**
   * Attach FastClick to the body
   */
  FastClick.attach(document.body);

  /**
   * Initialise inlineSVG
   */
  loadJS('/javascripts/libraries/inlineSVG.js', function () {
    inlineSVG.init();
  });

  /**
   * Initialise placeholders for browsers that don't support them.
   */
  if (!Modernizr.placeholder) {
    loadJS('/javascripts/libraries/placeholders.min.js');
  }

  /**
   * Initialise LazySizes
   */
  loadJS('/javascripts/libraries/lazysizes.js');

  /**
   * Initialise Cookie Disclaimer
   */
  CookieDisclaimer.init({
    template: '/javascripts/templates/cookie-banner.html'
  });

  /**
   * Initialise Picturefill
   */
  picturefill();

});
