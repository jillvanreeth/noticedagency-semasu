;var fullscreenVisual = (function(w, d, undefined) {

  'use strict';

  var s = {
    debug: false,
    selectors: {
      theWrap: '.fullscreenVisual',
      theOverlay: '.fullscreenVisual__overlay',
      theVisual: '.fullscreenVisual__theVisual',
    },
    classes: {
      isVisble: 'is-visible',
      isHidden: 'is-hidden',
    },
    settings: {}, 
  },
  els = {},

  init = function() {

    if(!d.querySelectorAll(s.selectors.theWrap).length) { return false; }
    s.debug && console.log('FULLSCREENVISUAL: INIT');

    // define elements
    els.theWrap = d.querySelectorAll(s.selectors.theWrap);
    
    checkVisual();
  
  },

  checkVisual = function() {

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
    
      Array.prototype.slice.call(entries).forEach((entry) => {
        if(entry.isIntersecting) {
          entry.target.classList.remove(s.classes.isHidden);
          entry.target.classList.add(s.classes.isVisble);
          w.addEventListener('scroll', scrollEvent);
        }
        else {
          entry.target.classList.remove(s.classes.isVisble);
          entry.target.classList.add(s.classes.isHidden);
          w.removeEventListener('scroll',scrollEvent);
        }
      });
    },
    {rootMargin: '0px 0px 0px 0px'});

    Array.prototype.slice.call(els.theWrap).forEach((element) => intersectionObserver.observe(element));

    const scrollEvent = (() => {
      d.querySelector(s.selectors.theOverlay).style.top = (w.pageYOffset -w.innerHeight) + 'px';
    });
  };

  return {
    init: init,
  };


}(window, window.document));

export { fullscreenVisual };