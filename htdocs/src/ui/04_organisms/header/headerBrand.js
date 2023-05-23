;var headerBrand = (function(w, d, undefined) {

  'use strict';

  var s = {
  	debug: true,
      selectors: {
        theWrap: '.header__brand',
        firstEl: '.brand__path--s-top',
        lastEl: '.brand__path--u',
      },
      classes: {
        animationStart: 'headerBrand-is-animating-in',
        animationEnd: 'headerBrand-is-animating-out',
        fadeIn: 'headerBrand-is-fading',
      },
      settings: {
      	isAnimating: true,
      	animateCookie: 'animateCookie',
      },
    },
    els = {},

    init = function() {

    	if(!d.querySelectorAll(s.selectors.theWrap).length) { return false; }
      s.debug && console.log('HEADERBRAND: INIT');

      // define elements
      define();
     	
      s.settings.animateCookie && fadeIt();

     	// bind events
     	els.theWrap.addEventListener('mouseover', animateIt);

    },

    define = function() {

    	els.theWrap = d.querySelector(s.selectors.theWrap);
    	els.firstEl = els.theWrap.querySelector(s.selectors.firstEl);	
    	els.lastEl = els.theWrap.querySelector(s.selectors.lastEl);

    },

    fadeIt = function() {

    	els.theWrap.classList.add(s.classes.fadeIn);

    },

    shouldIAnimate = function() {
   
    	// no cookie? animate it
    	localStorage.getItem(s.settings.animateCookie) == null && animateIt();

    },

    animateIt = function(eventCallback) {

    	s.debug && console.log('HEADERBRAND: ANIMATE IT');

    	// set cookie
     	localStorage.setItem(s.settings.animateCookie, true);

    	els.theWrap.classList.add(s.classes.animationStart);
    	 
  	 	if(els.theWrap.classList.contains(s.classes.animationStart)) {
  	 		
    	 	els.lastEl.addEventListener('transitionend', callback);

    	 	function callback() {
    	 
    	 		s.debug && 	console.log('HEADERBRAND: CALLBACK TRANSITIONEND START',s.settings.isAnimating);
	 
	       	els.lastEl.removeEventListener('transitionend', null);
	       	s.settings.isAnimating = false;
	       	els.theWrap.classList.replace(s.classes.animationStart,s.classes.animationEnd);
	       	
	       	setTimeout(() => !s.settings.isAnimating && els.theWrap.classList.remove(s.classes.animationEnd), 1000);
	    
	       	return;
      	}
  		}
  	
    };

   return {
   	init: init,
   	shouldIAnimate: shouldIAnimate
   };

}(window, window.document));

export { headerBrand };