;var colorMode = (function(w, d, undefined) {

  'use strict';

  var s = {
    debug: false,
    settings: {
      activeMode: null,
    },
    classes: {
      darkMode: 'darkMode',
      lightMode: 'lightMode',
    }
  },
  els = {},

  setColorMode = function() {

    d.getElementById('theBucket').classList.contains(s.classes.lightMode) ? (s.settings.activeMode = s.classes.lightMode) : (s.settings.activeMode = s.classes.darkMode);
    s.debug && console.log('COLOR MODE: SET COLOR MODE',s.settings.activeMode);
  },
    
  getColorMode = function() {

    // get color mode on init
    d.getElementById('theBucket').classList.contains(s.classes.lightMode) ? (s.settings.activeMode = s.classes.lightMode) : (s.settings.activeMode = s.classes.darkMode);
    
    s.debug && console.log('COLOR MODE: GET COLOR MODE',s.settings.activeMode);
    return s.settings.activeMode;
  
  },

  darkMode = function() {
    
    s.debug && console.log('COLOR MODE: DARK MODE');
    d.getElementById('theBucket').classList.remove(s.classes.lightMode);
    d.getElementById('theBucket').classList.add(s.classes.darkMode);
  },

  lightMode = function() {
    
    s.debug && console.log('COLOR MODE: LIGHT MODE');
    d.getElementById('theBucket').classList.remove(s.classes.darkMode);
    d.getElementById('theBucket').classList.add(s.classes.lightMode);

  };

  return {
    setColorMode:setColorMode,
    getColorMode:getColorMode,
    darkMode:darkMode,
    lightMode:lightMode,
  };

}(window, window.document));

export { colorMode };