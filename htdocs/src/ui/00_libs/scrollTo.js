;var scrollTo = (function(w, d, undefined) {

  'use strict';

  var s = {
        debug: false,
        selectors: {},
        classes: {},
      },
      els = {},
      init = function() {

        s.debug && console.log('SCROLLTO: INIT');

        els.theTriggers = d.querySelectorAll('a[href^="#"]');
  
        Array.prototype.slice.call(els.theTriggers).forEach(function(theTrigger) {
          theTrigger.addEventListener('click', function (e) {
          
          	s.debug && console.log('SCROLLTO: CLICK', theTrigger);
           
            e.preventDefault();
            smoothScroll(theTrigger);
          });
        });
      },

      smoothScroll = function(theTrigger) {

        var theTarget = theTrigger.getAttribute('href').replace('#','');  
      
        s.debug && console.log('SCROLLTO: SMOOTHSCROLL', theTarget);

        if(theTarget == null) { return false; }
       
        var topOfElement = d.getElementById(theTarget).offsetTop;
      
         w.scroll({ top: topOfElement, behavior: 'smooth' });

      };

  return {
    init:init
  };

}(window, window.document));

export { scrollTo };