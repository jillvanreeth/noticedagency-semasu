;var inputs = (function(w, d, undefined) {

  'use strict';

  var s = {
    debug: true,
    selectors: {
      theInputs: '.input__field',
    },
    classes: {
      hasValue: 'has-value',
      isInvalid: 'is-invalid',
    },
    settings: {}, 
  },
  els = {},

  init = function() {

    if(!d.querySelectorAll(s.selectors.theInputs).length) { return false; }
    s.debug && console.log('INPUTS: INIT');

    // define elements
    els.thetheInputs = d.querySelectorAll(s.selectors.theInputs);

    
    Array.prototype.slice.call(els.thetheInputs).forEach(function(theInput){
      
      // do stuff on init
      theInput.innerHTML && checkForValue(theInput);

      // bind events 
      theInput.addEventListener('keyup', checkForValue);
      theInput.addEventListener('blur', checkForValue);
      theInput.addEventListener('focus', hasValue);
    });
  
  },

  checkForValue = function(theInput) {
     
    var currentInput = this || theInput;
    var theParent = currentInput.parentNode;
    var theValue = currentInput.innerHTML || currentInput.value.trim();

    s.debug && console.log('INPUTS: CHECK FOR VALUE', theValue);
  
    theValue !== '' ? hasValue(currentInput) : theParent.classList.remove(s.classes.hasValue); 

  },

  hasValue = function(theInput) {
    
    var currentInput = this || theInput;
    var theParent = currentInput.parentNode;
    var theValue = currentInput.innerHTML || currentInput.value.trim();
    
    s.debug && console.log('INPUTS: HAS VALUE', theParent,currentInput);

    theParent.classList.add(s.classes.hasValue);

    // reset errors if necessary
    if(theParent.classList.contains(s.classes.isInvalid)) { 
      theParent.classList.remove(s.classes.isInvalid);
    }
  };

  return {
    init:init
  };

}(window, window.document));

export { inputs };
