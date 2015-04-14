Helpers.ready(function() {

  /**
   * Attach FastClick to the body
   */
  FastClick.attach(document.body);

  /**
   * Initialise inlineSVG
   */
  if (Modernizr.inlinesvg) {
    Helpers.loadJS('/javascripts/libraries/inlineSVG.js', function() {
      inlineSVG();
    });
  } else {
    var svgs = document.querySelectorAll('img.svg');
    for (i = 0; i < svgs.length; i++) {
      var fallback = svgs[i].getAttribute('data-fallback');
      svgs[i].src = fallback;
    }
  }

  /**
   * Initialise placeholders for browsers
   * that don't support them.
   */
  if (!Modernizr.input.placeholder) {
    Helpers.loadJS('/javascripts/libraries/placeholders.min.js');
  }

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
