;var validation = (function(w, d, undefined) {

  'use strict';

  var s = {
    debug: true,
    selectors: {
      theForm: '.form',
      theSubmit: '[type="submit"]',
      theInputs: '.input__field[required]',
    },
    classes: {
      hasValue: 'hasValue',
      isInvalid: 'is-invalid',
      isDisabled: 'is-disabled',
      isSucces: 'form-is-succes',
      isFailed: 'form-is-failed',
    },
    settings: {
      valid: false,
      url: '/mailer.php',
    }, 
  },
  els = {},

  init = function() {

    if(!d.querySelectorAll(s.selectors.theForm).length) { return false; }
    s.debug && console.log('VALIDATION: INIT');

    // define elemnts
    els.theForm = d.querySelector(s.selectors.theForm);
    els.theSubmit = els.theForm.querySelector(s.selectors.theSubmit);
    
    // bind events
    els.theForm.addEventListener('submit', onSubmit);

  },

  onSubmit = function(e) {

    e.preventDefault();

    var currentForm = e.target;
   

    s.debug && console.log('VALIDATION: ONSUBMIT',currentForm);

    // disable submit to prevent double clicks 
    els.theSubmit.disabled = true;

    validateIt(currentForm) && sendIt(currentForm);   

  },

  sendIt = function(theForm) {

    var formData = serializeArray(theForm);
   
    s.debug && console.log('VALIDATION: SUBMIT', formData);

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
          
    xhr.open('POST', s.settings.url);
    xhr.onreadystatechange = function() {
      if(xhr.readyState > 3 && xhr.status == 200) {
        console.log(xhr.responseText);
        afterSubmit(JSON.parse(xhr.responseText)); 
      }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify(formData));

    return xhr;

  },

  afterSubmit = function(response) {
    
    !response ? onFail() : onSucces();

  },

  onSucces = function() {

    s.debug && console.log('VALIDATION: SUCCES! :-)');

    d.body.classList.add(s.classes.isSucces);

  },

  onFail = function() {

    s.debug && console.log('VALIDATION: FAIL! :-(');

    d.body.classList.add(s.classes.isFail);
  
  },

  validateIt = function(currentForm) {

    els.theSubmit.disabled = false;
    s.settings.valid = true;

    // get fields to validate
    var theInputs = currentForm.querySelectorAll(s.selectors.theInputs);

    Array.prototype.slice.call(theInputs).forEach(function(theInput) {

      var theValue = theInput.value.trim() || null;
      
      s.debug && !theValue && console.log('VALIDATION: VALIDATE IT', theInput, 'no value'); 
      
      // if empty
      if(!theValue) { errorHandling(theInput); return false; }

      // if email
      if(theValue && theInput.type === 'email') { 
        if(!validateEmail(theValue)) { errorHandling(theInput); return false; }
      }
    });

    // validate the select field
    //currentForm.querySelector('.selectDropdown__selectedOption__label').innerHTML


    return s.settings.valid;

  },

  errorHandling = function(theInput) {
    
    s.settings.valid = false;
    
    var currentInput = theInput;
    var theParent = currentInput.parentNode;

    theParent.classList.add(s.classes.isInvalid);

  },

  validateEmail = function(theValue) {

    return (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(theValue);

  },

  serializeArray = function (form) {

    s.debug && console.log('VALIDATION: SERIALIZE');
    // Setup our serialized data
    var serialized = [];

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {

      var field = form.elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

      // If a multi-select, get all selections
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized.push({
            name: field.name,
            value: field.options[n].value
          });
        }
      }

      // Convert field data to a query string
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push({
          name: field.name,
          value: field.value
        });
      }
    }

    return serialized;

  };

  return {
    init:init
  };

}(window, window.document));

export { validation };
