;var tableswitch = (function(w, d, undefined) {

  'use strict';

  var s = {
        debug: false,
        selectors: {
          theWrap: '.tableswitch',
        },
        classes: {
          active: 'tableswitch-is-active',
        },
        settings: {
          active: false,
        }
      },
      els = {},

      init = function() {

        if(!d.querySelectorAll(s.selectors.theWrap).length) { return false; }
        s.debug && console.log('TABLESWITCH: INIT');

        // define elements
        els.theWrap = d.querySelectorAll(s.selectors.theWrap);

        switchIt();

        // bind events
        els.theTriggers.length && Array.prototype.slice.call(els.theTriggers).forEach(function(theTrigger) {
        
          theTrigger.addEventListener('click', function() {
            if(theTrigger.classList.contains(s.classes.active)) { return false; }          
            showTab(theTrigger);    
          });
        });
      },

      bindElements = function() {

        // define elements
        els.theTriggers = d.querySelectorAll('.credittable__tabs__header__item');
        els.theTargets = d.querySelectorAll('.credittable__tab');

      },

      switchIt = function() {

        s.debug && console.log('TABLESWITCH: SWITCH IT');

        Array.prototype.slice.call(els.theWrap).forEach(function(theTarget) {

          var divTable;
          var tds = [];
         
           // // get the tbody rows
          Array.prototype.slice.call(theTarget.querySelectorAll('tbody tr')).forEach(function(theRow,index) {
            tds.push(theRow.querySelectorAll('td'));
          });

          // open the table
          divTable = '<div class="credittable__tabs">';

          // open tab headers
          divTable += '<div class="credittable__tabs__header">';

          var ths = [];

          // get the table headers
          Array.prototype.slice.call(theTarget.querySelectorAll('thead th')).forEach(function(theHeader,index) {
            //print active class on first item
            var activeclass = null;
            index == 0 ? activeclass = s.classes.active : activeclass = ''; 

            ths.push(theHeader.innerHTML);
            divTable += '<div class="credittable__tabs__header__item ' + activeclass + '" data-title="' + theHeader.innerHTML.toLowerCase() + '">' + theHeader.innerHTML + '</div>';
          });

          // close tab headers
          divTable += '</div>';

          // convert nodelist to array
          var thsArray = Array.prototype.slice.call(ths);

          for(var i = 0; i < thsArray.length; i++) {

            //print active class on first item
            var activeclass = null;
            i == 0 ? activeclass = s.classes.active : activeclass = ''; 
           
            // build table for each th
            divTable += '<div class="credittable__tab ' + activeclass + '" data-content="' + thsArray[i].toLowerCase() + '">';

            // // build header for each first th
            divTable += '<div class="credittable__thead">' + thsArray[i] + '</div>';

            // build tbody
            divTable += '<div class="credittable__tbody">';

            // convert nodelist to array
            var tdsArray = Array.prototype.slice.call(tds);
           
            //add the tds to the tbody
            for(var j = 0; j < tdsArray.length; j++) {
            
              divTable += '<div class="credittable__trow">';
              divTable += '<span class="credittable__td">' + tdsArray[j][i].innerHTML + '</span>';
              
              divTable += '</div>';

            }
            // close the table and tbody
            divTable += '</div></div>';
          }

          // append the divTable
          theTarget.innerHTML += divTable;

          // close the table
          divTable += '</div>';

        });  

        bindElements();

      },

      showTab = function(theTrigger) {

        s.debug && console.log('TABLESWITCH: SHOWTAB', theTrigger);

        // reset triggers
        Array.prototype.slice.call(els.theTriggers).forEach(function(theTrigger) {
           theTrigger.classList.remove(s.classes.active);
        });
       
        theTrigger.classList.add(s.classes.active);

        // get tab
        Array.prototype.slice.call(els.theTargets).forEach(function(theTarget) {
          theTarget.dataset.content == theTrigger.dataset.title ? theTarget.classList.add(s.classes.active) : theTarget.classList.remove(s.classes.active);;
        });

      };

  return {
    init:init
  };

}(window, window.document));

export { tableswitch };