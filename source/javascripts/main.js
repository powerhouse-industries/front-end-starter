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
      'build/javascripts/libraries/inlineSVG.js'
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
      'build/javascripts/libraries/jquery.placeholder.js'
    ],
    callback: function (url, result, key) {
      if (!result) {
        var inputs = document.getElementsByTagName('input, textarea');
        for (i = 0; i < inputs.length; i++) {
          inputs[i].placeholder();
        }
      }
    }
  });


  /**
   * Initialise Cookie Disclaimer
   */
  CookieDisclaimer.init({
    template: '/build/javascripts/templates/cookie-banner.html'
  });


  /**
   * Initialise PictureFill
   */
  picturefill();


  /**
   * Initialise CheckMQ
   */
  checkMQ.init();

});
