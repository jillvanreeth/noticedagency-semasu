;var getWindowSize = (function(w, d, undefined) {

  var getSize = function() {

      return w.getComputedStyle(d.getElementById('theBody'), ':before').getPropertyValue('content').replace(/\"/g, '');

    };

  return {
    theSize: getSize
  }


}(window, window.document));

export { getWindowSize };