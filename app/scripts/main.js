const attachFastClick = require('fastclick'),
      picturefill     = require('picturefill');

(function() {

  'use strict';

  // Remove the 300ms delay on some mobile devices
  attachFastClick.attach(document.body);

  // Add <picture> support to browsers that don't support it natively
  picturefill();

})();
