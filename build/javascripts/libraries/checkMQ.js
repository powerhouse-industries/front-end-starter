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

    for (var x = 0; x < theBreakpoints.length; x++){
      if (theBreakpoints[x].theQuery.matches) {
        if (theMQ !== theBreakpoints[x].theName) {
          theMQ = theBreakpoints[x].theName;
        }
      }
    }

    loadFunctions(theMQ);

    return theMQ;

  };

  // Event listener for changes in MQ
  var changeMQ = function() {

    for (var y = 0; y < theBreakpoints.length; y++){
      theBreakpoints[y].theQuery.addListener(whichMQ);
    }

  };

  // Load the functions
  var loadFunctions = function(theMQ) {

    for (var z = 0; z < theFunctions.length; z++){
      theFunctions[z](theMQ);
    }

  };

  // Add functions to theFunctions array
  var addFunction = function(fn) {

    theFunctions.push(fn);

  };

  // Init
  var init = function() {

    changeMQ();
    whichMQ();
    return this;

  };

  // Provide some public methods for access outside the module
  return {
    init: init,
    addFunction: addFunction
  };

})();
