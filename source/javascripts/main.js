Helpers.ready(function() {

  /**
   * Attach FastClick to the body
   */
  FastClick.attach(document.body);


  /**
   * Initialise inlineSVG
   */
  yepnope({
    test : Modernizr.inlinesvg,
    yep: [
      '/javascripts/libraries/inlineSVG.js'
    ],
    callback: function (url, result, key) {
      if (result) {
        inlineSVG();
      } else {
        var svgs = document.querySelectorAll('img.svg');
        for (i = 0; i < svgs.length; i++) {
          var fallback = svgs[i].getAttribute('data-fallback');
          svgs[i].src = fallback;
        }
      }
    }
  });


  /**
   * Initialise placeholders for browsers
   * that don't support them.
   */
  yepnope({
    test : Modernizr.input.placeholder,
    nope: [
      '/javascripts/libraries/placeholders.min.js'
    ]
  });


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


  /**
   * Initialise CheckMQ
   */
  checkMQ.init();
  checkMQ.addFunction(test);

});
