;var teamslider = (function(w, d, undefined) {

  'use strict';

  var s = {
    debug: true,
      selectors: {
        theWrap: '.teamslider',
        theSlides: '.teamslider__slide',
        theTrack: '.teamslider__track',
        prev: '.prev',
        next: '.next',
      },
      settings: {
        direction: null,
        startX: 0,
        endX: 0,
      },
      classes: {
        active: 'active',
        disabled: 'disabled',
        first: 'first',
        last: 'last',
      },
    },
    timer,
    els = {},

    timeout = function() {
      
      clearTimeout(timer);

      setTimeout(function(){
        positionSlides();
      }, 300);  
    },

    init = function() {
      console.log('init');

      if(!d.querySelectorAll(s.selectors.theWrap).length) { return false; }
      s.debug && console.log('TEAMSLIDER INIT');

      // define elements
      els.theWrap = d.querySelectorAll(s.selectors.theWrap)[0];
      els.theSlides = els.theWrap.querySelectorAll(s.selectors.theSlides);
      els.theTrack = els.theWrap.querySelector(s.selectors.theTrack);
      els.prevBtn = els.theWrap.querySelector(s.selectors.prev);
      els.nextBtn = els.theWrap.querySelector(s.selectors.next);
      
      // do stuff on init
      positionSlides();

      // bind events
      w.addEventListener('resize', timeout);
      mouseEvents();
      touchEvents();
    }, 

    mouseEvents = function() {
      console.log('mouseEvents');
      
      els.prevBtn.addEventListener('click', function() {
        if(this.classList.contains(s.classes.disabled)) { return false; }
        s.settings.direction = this.dataset.dir;
        slideIt();
      });

      els.nextBtn.addEventListener('click', function() {
        if(this.classList.contains(s.classes.disabled)) { return false; }
        s.settings.direction = this.dataset.dir;
        slideIt();
      });

      els.theTrack.addEventListener('mouseup', getDirection);

      els.theTrack.addEventListener('mousedown', function(e) {
        s.settings.startX = e.pageX;
      }); 

    },   

    touchEvents = function() {
      console.log('touchevents');

      els.theTrack.addEventListener('touchstart', function(e) {
        s.debug && console.log('touchstart',e.changedTouches[0].pageX); 
        s.settings.startX = e.changedTouches[0].pageX; 
      });

      els.theTrack.addEventListener('touchend', getDirection);
      
      //els.theTrack.addEventListener("touchcancel", function() {console.log('touchcancel')});
      //els.theTrack.addEventListener("touchmove", function() {console.log('touchmove')});
    },

    getDirection = function(e) {
      console.log('getDirection')
      
      // don't do anything when the buttons are clicked  
      if(e.target == els.prevBtn || e.target == els.nextBtn) { return false; }
     
      s.settings.endX = e.pageX || e.changedTouches[0].pageX;
      
      s.debug && console.log('TEAMSLIDER: STARTX', s.settings.startX , 'ENDX', s.settings.endX);

      s.settings.endX < s.settings.startX ? s.settings.direction = 'next' : s.settings.direction = 'prev';
      
      // check for last|first slide
       var activeSlide = getActiveSlide();
     
      if(s.settings.direction == 'prev' && activeSlide.classList.contains(s.classes.first)) { return false; }
      if(s.settings.direction == 'next' && activeSlide.classList.contains(s.classes.last)) { return false; }

      slideIt();
    },

    slideIt = function() {
      console.log('slideIt');

      var activeSlide = getActiveSlide();
      
      if(s.settings.direction == 'prev') { prevSlide(activeSlide); }
      if(s.settings.direction == 'next') { nextSlide(activeSlide); }

      s.debug && console.log('TEAMSLIDER SLIDE IT');

      Array.prototype.slice.call(els.theSlides).forEach(function(theSlide) {
       
        var currentOffset = parseInt(theSlide.style.left);
        var newOffset;
        //var currentOffset = ;
        newOffset = s.settings.direction == 'prev' ? currentOffset + theSlide.clientWidth : currentOffset - theSlide.clientWidth;

        theSlide.style.left = newOffset + 'px';

      });
    },

    getActiveSlide = function() {
      console.log('getActiveSlide');

      var activeSlide;

       // get active slide
      Array.prototype.slice.call(els.theSlides).forEach(function(theSlide) { 
        theSlide.classList.contains(s.classes.active) && (activeSlide =  theSlide);
      });

      return activeSlide; 
    },

    nextSlide = function(activeSlide) {
      console.log('nextslide');
      
      s.debug && console.log('TEAMSLIDER NEXT', activeSlide);

      var nextSlide;
      
      if(activeSlide.nextElementSibling) { 
        nextSlide = activeSlide.nextElementSibling;
        console.log(nextSlide);

        activeSlide.classList.remove(s.classes.active);
        console.log(activeSlide);
        nextSlide.classList.add(s.classes.active);
        console.log(nextSlide);

        if(nextSlide.classList.contains(s.classes.last)) {
          els.nextBtn.classList.add(s.classes.disabled);
          els.prevBtn.classList.remove(s.classes.disabled);
        }
       
        activeSlide = nextSlide;
      }
    },

    prevSlide = function(activeSlide) {
      console.log('prevSlide')
      
      s.debug && console.log('TEAMSLIDER PREV',activeSlide);

      var prevSlide;
      
      if(activeSlide.previousElementSibling && !activeSlide.classList.contains(s.classes.first)) { 
        prevSlide = activeSlide.previousElementSibling;

        activeSlide.classList.remove(s.classes.active); 
        prevSlide.classList.add(s.classes.active);

        if(prevSlide.classList.contains(s.classes.first)) {
          els.prevBtn.classList.add(s.classes.disabled);
          els.nextBtn.classList.remove(s.classes.disabled);
        }

        activeSlide = prevSlide;
      }
    },

    positionSlides = function() {
      console.log('positionSlides')

      var offset = 0;
      var theOffset = offset;
      var track = 0;

      //position the slides
      Array.prototype.slice.call(els.theSlides).forEach(function(theSlide) {
        
        //theSlide.style.left = theOffset + '%';
         //theSlide.style.left = '0%'; 
         track = track + theSlide.clientWidth;
         theSlide.style.left = '0'; 
        theOffset = theOffset + 100;
      });

      els.theTrack.style.width = track + 'px';
    };

  return {
    init: init,
  };


}(window, window.document)); 

export { teamslider };
