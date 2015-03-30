var Helpers = (function () {

  var request,
      template,
      element,
      type,
      handler;

  /**
   * A vanilla JS alternative to $(document).ready();
   */

  var ready = function (fn) {

    if (document.readyState != 'loading'){
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState != 'loading')
          fn();
      });
    }

  };


  /**
   * A vanilla JS alternative to $().on();
   */

  var addEventListener = function(el, eventName, handler) {

    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function(){
        handler.call(el);
      });
    }

  };


  /**
   * Get contents of file
   */

  var getFileContents = function(file, callback) {

    request = new XMLHttpRequest();
    request.open('GET', file, true);

    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 500) {
          callback(this.responseText);
        }
      }
    };

    request.send();
    request = null;

  };


  /**
   * Load a Javascript file asynchronously
   */
  var loadJS = function (src, cb){
 	  var ref = window.document.getElementsByTagName( "script" )[ 0 ];
 	  var script = window.document.createElement( "script" );
   	script.src = src;
   	script.async = true;
   	ref.parentNode.insertBefore( script, ref );
   	if (cb && typeof(cb) === "function") {
   		script.onload = cb;
   	}
   	return script;
  };


  return {
    ready: ready,
    addEventListener: addEventListener,
    getFileContents: getFileContents,
    loadJS: loadJS
  };

})();
