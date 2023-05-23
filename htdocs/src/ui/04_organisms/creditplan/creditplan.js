import { getWindowSize } from './../../00_libs/getWindowSize.js';

;var creditplan = (function(w, d, undefined) {

  'use strict';

  var s = {
        debug: false,
        selectors: {
          theWrap: '.creditplan',
          theItemWrap: '.creditplan__itemWrap',
          theSteps: '.creditplan__step',
        },
        settings: {
          overflow: true,
          lastScrollTop: 0,
        },
        classes: {
          animate: 'is-animated',
        },
      },
     
      els = {},

      init = function() {

        if(!d.querySelectorAll(s.selectors.theWrap).length) { return false; }
        s.debug && console.log('CREDITPLAN: INIT');

        // define elements
        els.theWrap = d.querySelector(s.selectors.theWrap);
        els.theItemWrap = d.querySelector(s.selectors.theItemWrap);
        els.theSteps = els.theWrap.querySelectorAll(s.selectors.theSteps);

        // animate steps on desk size
        (getWindowSize.theSize() == 'xlarge' || getWindowSize.theSize() == 'xxlarge' && !!w.IntersectionObserver) && animateSteps();

      },

      animateSteps = function() {
      
        const intersectionObserver = new IntersectionObserver((entries, observer) => {
          Array.prototype.slice.call(entries).forEach((entry) => {
            if(entry.isIntersecting) {
              entry.target.classList.add(s.classes.animate);
            }
            else {
              entry.target.classList.remove(s.classes.animate);
            }
          });
        }, {rootMargin: '100px 0px -40% 0px'});

        Array.prototype.slice.call(els.theSteps).forEach((element) => intersectionObserver.observe(element));

      };

  return {
    init:init
  };

}(window, window.document));

export { creditplan };
