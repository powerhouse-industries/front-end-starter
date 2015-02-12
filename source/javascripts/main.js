Helpers.ready(function() {

  FastClick.attach(document.body);

  yepnope({
    test : Modernizr.inlinesvg,
    yep: [
      './libraries/inline-svg/inline-svg.js'
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
      '/source/components/jquery-placeholder/jquery.placeholder.js'
    ],
    callback: function (url, result, key) {
      if (!result) {
        document.getElementsByTagName('input, textarea').placeholder();
      }
    }
  });

  picturefill();

});
