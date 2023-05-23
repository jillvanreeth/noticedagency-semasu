;var accordeon = (function(w, d, undefined) {

  'use strict';

   var s = {
    debug: false,
      selectors: {
        theWrap: '.accordeon',
        theItems: '.accordeon__item',
        theTrigger: '.accordeon__trigger',
      },
      classes: {
        open: 'accordeon-is-open',
      },
    },
    els = {},

    init = function() {

      if(!d.querySelectorAll(s.selectors.theWrap).length) { return false; }
      s.debug && console.log('ACCORDEON INIT');

      // define elements
      els.theWrap = d.querySelectorAll(s.selectors.theWrap);
      els.theItems = d.querySelectorAll(s.selectors.theItems);
      els.theTriggers = d.querySelectorAll(s.selectors.theTrigger);

      // bind events
      Array.prototype.slice.call(els.theTriggers).forEach(function(theTrigger) {

        theTrigger.addEventListener('click', function(e) {
          s.debug && console.log('ACCORDEON CLICK', theTrigger);

          toggleIt(theTrigger);

        });
      });
    },

    toggleIt = function(theTrigger) {

      // get the item
      var theParent = getParent(theTrigger);

      // close the other targets
      Array.prototype.slice.call(els.theItems).forEach(function(theItem) { 
        theItem != theParent && theItem.classList.remove(s.classes.open); 
      });

      // toggle open class
      theParent.classList.contains(s.classes.open) ? theParent.classList.remove(s.classes.open) : theParent.classList.add(s.classes.open);

    },

    getParent = function(theTrigger) {

      var theParents,
          theParentElement;

          // no params
          if(!theTrigger || !s.selectors.theWrap) { console.error('Missing arguments!'); return false; }

          // If no parentSelector defined will bubble up all the way to *document*
          theParents = d.querySelectorAll(s.selectors.theItems);
          theParents = theParents.length ? Array.prototype.slice.call(theParents) : [];
          theParentElement = theTrigger.parentElement;

          // no parentElement
          if(!theParentElement) { return false; }

          // loop as long as the element is not the body or the element is not in the nodelist
          while(theParentElement && theParentElement !== d.body && theParents.indexOf(theParentElement) === -1) {
              theParentElement = theParentElement.parentElement;
          }

          return theParentElement || false;
    };

  return {
    init: init,
  };

}(window, window.document));

export { accordeon };
