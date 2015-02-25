Helpers.ready(function() {

  FastClick.attach(document.body);

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

  yepnope({
    test : Modernizr.input.placeholder,
    nope: [
      'build/javascripts/libraries/jquery.placeholder.js'
    ],
    callback: function (url, result, key) {
      if (!result) {
        document.getElementsByTagName('input, textarea').placeholder();
      }
    }
  });

  picturefill();

});
