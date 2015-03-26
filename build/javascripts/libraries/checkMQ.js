window.checkMQ = (function() {

  var theFunctions = [], theBreakpoints;

  theBreakpoints = [
    { theName: 'mqCore', theQuery: window.matchMedia('screen and (max-width: 599px)') },
    { theName: 'mq600', theQuery: window.matchMedia('screen and (min-width: 600px) and (max-width: 959px)') },
    { theName: 'mq960', theQuery: window.matchMedia('screen and (min-width: 960px) and (max-width: 1199px)') },
    { theName: 'mq1200', theQuery: window.matchMedia('screen and (min-width: 1200px)') }
  ];

  // Check MQ on document ready
  var whichMQ = function() {

    var theMQ;

    for (var i = 0; i < theBreakpoints.length; i++){
      if (theBreakpoints[i].theQuery.matches) {
        if (theMQ !== theBreakpoints[i].theName) {
          theMQ = theBreakpoints[i].theName;
        }
      }
    }

    loadFunctions(theMQ);

    return theMQ;

  };

  // Event listener for changes in MQ
  var changeMQ = function() {

    for (var i = 0; i < theBreakpoints.length; i++){
      theBreakpoints[i].theQuery.addListener(whichMQ);
    }

  };

  // Load the functions
  var loadFunctions = function(theMQ) {

    for (var i = 0; i < theFunctions.length; i++){
      theFunctions[i](theMQ);
    }

  };

  // Add functions to theFunctions array
  var addFunction = function(fn) {

    theFunctions.push(fn);

  };

  // Init
  var init = function() {

    whichMQ();
    changeMQ();
    return this;

  };

  // Provide some public methods for access outside the module
  return {
    init: init,
    whichMQ: whichMQ,
    changeMQ: changeMQ,
    addFunction: addFunction
  };

})();

if (document.readyState != 'loading'){
  checkMQ.init();
} else if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', checkMQ.init);
} else {
  document.attachEvent('onreadystatechange', function() {
    if (document.readyState != 'loading')
    checkMQ.init();
  });
}
