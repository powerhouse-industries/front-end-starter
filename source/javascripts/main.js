PowerHouse.ready(function () {

  /**
   * Attach FastClick to the body
   */
  FastClick.attach(document.body);

  /**
   * Initialise inlineSVG
   */
  if (Modernizr.inlinesvg) {
    loadJS('/javascripts/libraries/inlineSVG.js', function() {
      inlineSVG();
    });
  } else {
    var svgs = document.querySelectorAll('img.svg');
    PowerHouse.forEachElement(svgs, function (svg, i) {
      var fallback = svg.getAttribute('data-fallback');
      svgs.src = fallback;
    });
  }

  /**
   * Initialise placeholders for browsers
   * that don't support them.
   */
  if (!Modernizr.input.placeholder) {
    loadJS('/javascripts/libraries/placeholders.min.js');
  }

  /**
   * Initialise LazySizes if the browser supports
   * getElementsByClassName() otherwise swap data
   * attributes for src attributes
   */
  if ('getElementsByClassName' in document) {
    loadJS('/javascripts/libraries/lazysizes.js');
  } else {
    var images = document.querySelectorAll('img.lazyload'),
        videos = document.querySelectorAll('iframe.lazyload');

    PowerHouse.forEachElement(images, function (el, i) {
      var src = el.getAttribute('data-src'),
          srcset = el.getAttribute('data-srcset');
      if (srcset) {
        var res = /(?:([^"'\s,]+)\s*(?:\s+\d+[wx])(?:,\s*)?)+/g.exec(srcset);
        el.setAttribute('src', res[res.length - 1]);
      } else {
        el.setAttribute('src', src);
      }
    });

    PowerHouse.forEachElement(videos, function (el, i) {
      var src = el.getAttribute('data-src');
      if (src) {
        el.setAttribute('src', src);
      }
    });
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
