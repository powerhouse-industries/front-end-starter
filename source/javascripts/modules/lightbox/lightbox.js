/**
 * A lightbox module
 */

var Lightbox = (function (Helpers) {

  var config = {
    template: 'lightbox.html',
    selector: '[rel="lightbox"]',
    hashURL:  'lightbox-one'
  };

  var visible;

  /**
   * Build lightbox
   */

  var _buildLightbox = function () {

    // grab the contents of the template and insert it into the DOM
    Helpers.getFileContents('/build/javascripts/templates/' + config.template, function (response) {

      // create the lightbox
      var el = document.createElement('div');
      if (el.classList)
        el.classList.add('lightbox');
      else
        el.className += ' ' + 'lightbox';

      el.innerHTML += response;

      // create the overlay
      var overlay = document.createElement('div');
      if (overlay.classList)
        overlay.classList.add('overlay');
      else
        overlay.className += ' ' + 'overlay';

      // append both to the body
      document.body.appendChild(el);
      document.body.appendChild(overlay);

      // add a click event for the close icon
      var close = document.getElementById('close');
      close.onclick = _destroyLightbox;

      // add a click event for the overlay
      var overlayClose = document.querySelectorAll('.overlay');
      for(var i = 0; i < overlayClose.length; i++) {
        overlayClose[i].onclick = _destroyLightbox;
      }

      // change the URL so it's directly accessible
      history.replaceState({}, '', '#!' + config.hashURL);

      // set a variable so we detect if the lightbox is visible or not
      visible == true

    });

  };

  /**
   * Destroy lightbox
   */

  var _destroyLightbox = function () {
    var lightbox = document.querySelectorAll('.lightbox');
    for(var i = 0; i < lightbox.length; i++) {
      lightbox[i].parentNode.removeChild(lightbox[i]);
    }

    var overlay = document.querySelectorAll('.overlay');
    for(var i = 0; i < overlay.length; i++) {
      overlay[i].parentNode.removeChild(overlay[i]);
    }

    history.replaceState({}, '', location.pathname);

    visible == true
  };


  /**
   * Check URL
   */
  function checkURL() {

    // grab the hash
    var hash = window.location.hash,
        lightboxHash = '#!' + config.hashURL;

    console.log('hash: ' + hash);
    console.log('lightbox hash: ' + lightboxHash);

    Helpers.addEventListener(window, 'popstate', function() {
      hash = window.location.hash;

      if(hash == lightboxHash)
        _buildLightbox();
      else
        _destroyLightbox();
    });

    Helpers.addEventListener(window, 'load', function() {
      hash = window.location.hash;

      if(hash == lightboxHash)
        _buildLightbox();
      else
        _destroyLightbox();
    });

  }


  /**
   * Init
   */

  var init = function (options) {

    // check the URL and decide whether to show
    // the lightbox or not based on the hash
    checkURL();

    // override the default config
    for(var prop in options) {
      if(options.hasOwnProperty(prop)){
        config[prop] = options[prop];
      }
    }

    // link up all instances of the selector
    var links = document.querySelectorAll(config.selector);
    for(var i = 0; i < links.length; i++) {
      Helpers.addEventListener(links[i], 'click', _buildLightbox);
    }

    // close the lightbox when user hits 'esc'
    Helpers.addEventListener(window, 'keydown', function(e) {
      if (e.keyCode == 27)
        _destroyLightbox();
    });
  };

  return {
    init: init
  };

})(Helpers);
