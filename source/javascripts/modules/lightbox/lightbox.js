/**
 * An example module
 */

var Lightbox = (function (Helpers) {

  /**
   * Build lightbox
   */

  var _buildLightbox = function () {

    // grab the contents of the template
    // and insert it into the DOM
    Helpers.getFileContents('/build/javascripts/templates/lightbox.html', function (response) {
      document.body.innerHTML += response;
      document.body.innerHTML += '<div class="overlay"></div>';
    });

  }

  /**
   * Destroy lightbox
   */

  var _destroyLightbox = function () {
    var lightbox = document.getElementsByClassName('lightbox');
    for(var i = 0; i < lightbox.length; i++) {
      lightbox[i].parentNode.removeChild(lightbox[i]);
    }

    var overlay = document.getElementsByClassName('overlay');
    for(var i = 0; i < overlay.length; i++) {
      overlay[i].parentNode.removeChild(overlay[i]);
    }
  }

  /**
   * Show lightbox
   */

  var showLightbox = function () {
    _buildLightbox();

    setTimeout(function() {
      var close = document.getElementById('close');
      close.onclick = _destroyLightbox;
    }, 100);
  };

  /**
   * Hide lightbox
   */

  var hideLightbox = function () {
    _destroyLightbox();
    console.log('hide');
  };

  return {
    show: showLightbox,
    hide: hideLightbox
  };

})(Helpers);


Helpers.ready(function() {
  var links = document.querySelectorAll('[rel="lightbox"]');
  for(var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      Lightbox.show();
    });
  }
});
