var PowerHouse = require('powerhouse-js'),
    picturefill = require('picturefill'),
    CookieDisclaimer = require('cookie-disclaimer'),
    attachFastClick = require('fastclick'),
    lazysizes = require('lazysizes');

PowerHouse.ready(function () {

  /**
   * Attach FastClick to the body
   */
  attachFastClick(document.body);

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
