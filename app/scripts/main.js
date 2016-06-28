const attachFastClick = require('fastclick'),
      picturefill     = require('picturefill');

(function() => {

  'use strict';

  // Remove the `no-js` class from the `<html>` element
  document.documentElement.classList.remove('no-js');

  // Remove the 300ms delay on some mobile devices
  attachFastClick.attach(document.body);

  // Add <picture> support to browsers that don't support it natively
  picturefill();

})();
