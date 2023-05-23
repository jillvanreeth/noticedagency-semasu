import { colorMode } from './colorMode.js';

;var dropdown = (function(w, d, undefined) {

  'use strict';

  var s = {
    debug: false,
      selectors: {
        theWrap: '.dropdown',
        theInnerWrap: '.dropdown__wrap',
        theTrigger: '.dropdown__trigger',
        offCanvas: '.dropdown__target',
      },
      classes: {
        open: 'dropdown-is-open',
        overflow: 'overflow-is-hidden',
      },
      settings: {
        colorMode: null,
      },
    },
    els = {},

    init = function() {
      
      if(!d.querySelectorAll(s.selectors.theWrap).length) { return false; }
      s.debug && console.log('DROPDOWN INIT');

      // get initial colormode
      s.settings.colorMode = colorMode.getColorMode();

      // define elements
      els.theWrap = d.querySelectorAll(s.selectors.theWrap);

      Array.prototype.slice.call(els.theWrap).forEach(function(theWrap) {

        theWrap.querySelector(s.selectors.theTrigger).addEventListener('click', function(e) {
          // get parent
          els.theWrap = getParent(e.target);
      
          toggleMenu(theWrap,e.target);
        });
    
     });

    },

    getParent = function(theChild) {

      //define variables
      var theParents,
          theParentElement;

      // no params
      if(!theChild || !s.selectors.theWrap) { console.error('Missing arguments!'); return false; }

      // If no parentSelector defined will bubble up all the way to *document*
      theParents    = d.querySelectorAll(s.selectors.theWrap);
      theParents    = theParents.length ? Array.prototype.slice.call(theParents) : [];
      theParentElement = theChild.parentElement;

      // no parentElement
      if(!theParentElement) { return false; }

      // loop as long as the element is not the body or the element is not in the nodelist
      while(theParentElement && theParentElement !== d.body && theParents.indexOf(theParentElement) === -1) {
          theParentElement = theParentElement.parentElement;
      }

      return theParentElement || false;

    },

    toggleMenu = function(currentWrap, currentTarget) {

      s.debug && console.log('DROPDOWN TOGGLE MENU');
      
      els.theWrap = currentWrap;
      console.log(els.theWrap);
      els.theWrap.classList.contains(s.classes.open) ? closeMenu() : openMenu();
            
    },

    closeMenu = function(cb) {

      s.debug && console.log('DROPDOWN CLOSE MENU');
      var currentWrap = els.theWrap[0] || els.theWrap;
      
      if(currentWrap.classList.contains(s.classes.open)) {

        currentWrap.classList.remove(s.classes.open);
        d.getElementById('theBody').classList.remove(s.classes.overflow);
        d.body.classList.remove(s.classes.overflow);
  
        
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

      if(s.settings.colorMode == 'lightMode') {
        colorMode.lightMode();
      }
      else {
        colorMode.darkMode();
      }

    },

    openMenu = function() {

      s.debug && console.log('DROPDOWN OPEN MENU');

      els.theWrap.classList.add(s.classes.open);
      d.getElementById('theBody').classList.add(s.classes.overflow);
      d.body.classList.add(s.classes.overflow);
	    colorMode.darkMode();
	 
    };

  return {
    init:init,
    closeMenu: closeMenu,
  };

}(window, window.document));

export { dropdown };