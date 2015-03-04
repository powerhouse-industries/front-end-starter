/**
 * A lightbox module
 */

var Lightbox = (function (Helpers) {

  var config = {
    template: 'lightbox.html',
    selector: '[rel="lightbox"]'
  }

  /**
   * Build lightbox
   */

  var _buildLightbox = function () {

    // grab the contents of the template and insert it into the DOM
    Helpers.getFileContents('/build/javascripts/templates/' + config.template, function (response) {

      // create the lightbox
      var element = document.createElement('div');
      element.className = 'lightbox';
      element.innerHTML += response;

      // create the overlay
      var overlay = document.createElement('div');
      overlay.className = 'overlay';

      // append both to the body
      document.body.appendChild(element);
      document.body.appendChild(overlay);

      // add a click event for the close icon
      var close = document.getElementById('close');
      close.onclick = _destroyLightbox;

      // add a click event for the overlay
      var overlayClose = document.getElementsByClassName('overlay');
      for(var i = 0; i < overlayClose.length; i++) {
        overlayClose[i].onclick = _destroyLightbox;
      }

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

  var init = function (options) {

    // override the default config
    for(var prop in options) {
      if(options.hasOwnProperty(prop)){
        config[prop] = options[prop];
      }
    }

    // link up all instances of the selector
    var links = document.querySelectorAll(config.selector);
    for(var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', _buildLightbox, false)
    }

    // close the lightbox when user hits 'esc'
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
