import { getWindowSize } 	from './../../00_libs/getWindowSize.js';
import { colorMode }     	from './../../00_libs/colorMode.js';
import { dropdown } 			from './../../00_libs/dropdown.js';

;var header = (function(w, d, undefined) {

  'use strict';

  var s = {
  	debug: false,
      selectors: {
        theWrap: '.header',
        theTrigger: '.header__menuIcon',
        offCanvas: '.header__offcanvas',
      },
      classes: {
        open: 'header-is-open',
        overflow: 'overflow-is-hidden',
        sticky: 'header-is-sticky',
      },
      settings: {
        colorMode: null,
      },
    },
    timer,
    els = {},

    timeout = function() {
      
      clearTimeout(timer);
      setTimeout(function(){
      	// make menu transparent while resizing
      	els.offCanvas.style.opacity = 0;
        shouldIStickOrShouldIGo();
        closeMenu();
      }, 300);  


    },

    init = function() {
			
      if(!d.querySelectorAll(s.selectors.theWrap).length) { return false; }
      s.debug && console.log('HEADER INIT');

      // define elements
      els.theWrap = d.querySelectorAll(s.selectors.theWrap)[0];
      els.offCanvas = d.querySelector(s.selectors.offCanvas);
      els.theTrigger = d.querySelectorAll(s.selectors.theTrigger)[0];

      // get initial colormode
      s.settings.colorMode = colorMode.getColorMode();
    
      // bind events
      els.theTrigger.addEventListener('click', toggleMenu);  
      
      w.addEventListener('resize', timeout);
      w.addEventListener('scroll', function() { shouldIStickOrShouldIGo(); });

    },

    toggleMenu = function() {

    	s.debug && console.log('HEADER TOGGLE MENU');
     	
     	els.theWrap.classList.contains(s.classes.open) ? closeMenu() : openMenu();
            
    },

    closeMenu = function(cb) {

      if(els.theWrap.classList.contains(s.classes.open)) {

        els.theWrap.classList.remove(s.classes.open);
        d.getElementById('theBody').classList.remove(s.classes.overflow);
        d.body.classList.remove(s.classes.overflow);
  			els.offCanvas.style.opacity = 0;
        
        // callback for when header menu is opened
        if(cb && typeof cb === 'function') {
          d.querySelector(s.selectors.offCanvas).addEventListener('transitionend', function eventCallback(){
            cb();

            d.querySelector(s.selectors.offCanvas).removeEventListener('transitionend', eventCallback);
          });
        }  
      }
      else {
        if(cb && typeof cb === 'function') {
          cb();  
        }  
      }

    },

    openMenu = function() {

    	// close dropdown menu
    	dropdown.closeMenu();
    	els.offCanvas.style.opacity = 1;
      els.theWrap.classList.add(s.classes.open);
      d.getElementById('theBody').classList.add(s.classes.overflow);
      d.body.classList.add(s.classes.overflow);
    },

    shouldIStickOrShouldIGo = function() {

      s.debug && console.log('HEADER RESIZE', getWindowSize.theSize());

      getWindowSize.theSize() == 'medium' || getWindowSize.theSize() == 'small' ? makeItSticky() : unStickIt();

    },

    makeItSticky = function() {

      var scrollOffset = w.scrollY || w.pageYOffset;
      var windowHeight = w.innerHeight;

      if(scrollOffset >= (els.theWrap.clientHeight * 1.5)){

        s.debug && console.log('HEADER MAKE IT STICKY');

        els.theWrap.classList.add(s.classes.sticky);
        colorMode.darkMode();
      }
      else {

        unStickIt();
      }
    },

    unStickIt = function() {
      
      s.debug && console.log('HEADER UN STICKY IT');
    
      els.theWrap.classList.remove(s.classes.sticky);
    
      if(s.settings.colorMode == 'lightMode') {
        colorMode.lightMode();
      }
      else {
        colorMode.darkMode();
      }
     
    };

  return {
    init: init,
    shouldIStickOrShouldIGo: shouldIStickOrShouldIGo,
  };

}(window, window.document));

export { header };