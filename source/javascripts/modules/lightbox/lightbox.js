/**
 * An example module
 */

var Lightbox = (function (Helpers) {

  var options = {
    template: 'lightbox.html',
    selector: '[rel="lightbox"]'
  }

  /**
   * Build lightbox
   */

  var _buildLightbox = function () {

    // grab the contents of the template
    // and insert it into the DOM
    Helpers.getFileContents('/build/javascripts/templates/' + options.template, function (response) {
      if(document.body != null) {
        document.body.appendChild(response);
        document.body.appendChild('<div class="overlay"></div>');
      }

      // add a click event for the close icon
      var close = document.getElementById('close');
      close.onclick = _destroyLightbox;
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
   * Init
   */

  var init = function () {
    var links = document.querySelectorAll(options.selector);
    for(var i = 0; i < links.length; i++) {
      // links[i].addEventListener('click', _buildLightbox, false);
      links[i].addEventListener('click', _buildLightbox, false)
    }

    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        _destroyLightbox();
      }
    };
  };

  return {
    init: init
  };

})(Helpers);
