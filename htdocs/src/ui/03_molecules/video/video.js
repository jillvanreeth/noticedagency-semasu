;var video = (function(w, d, undefined) {

   var s = {
      debug: false,
      settings: {},
      selectors: {
        theVideoPlayer: '.video',
        playBtn: '.video__button',
      },
      classes: {
        isPlaying: 'is-playing',
      },
      theVideo: {},
    },
    els = {},

    init = function() {
     	
     	if(!document.querySelector(s.selectors.theVideoPlayer)) { return false; }
      s.debug && console.log('VIDEO: INIT');
      var script;

      var script = document.createElement('script');
      script.src = "https://www.youtube.com/iframe_api";
      document.getElementsByTagName('head')[0].appendChild(script);

      // define elements
      els.theVideoPlayer = d.querySelector(s.selectors.theVideoPlayer);
      els.playBtn = els.theVideoPlayer.querySelector(s.selectors.playBtn);

      // bind events
      els.playBtn.addEventListener('click', playIt);

    },

    loadPlayer = function() {
      
      if(!document.querySelector(s.selectors.theVideoPlayer)) { return false; }
      s.theVideo.thePlayer = d.querySelector('.video__theVideo').id;
      s.theVideo.ytid = getPlayer(d.querySelector('.video__theVideo').dataset.ytid);

      s.debug && console.log('VIDEO: LOADPLAYER', s.theVideo.thePlayer,s.theVideo.ytid[1]);
      s.theVideo = createPlayer(s.theVideo);
    },

    getPlayer = function(theVideo) {
      
      return theVideo.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);

    },

    createPlayer = function(thePlayer) {
      s.debug && console.log('VIDEO : CREATEPLAYER', thePlayer);
  
      return new YT.Player(thePlayer.thePlayer, {
        height: '390',
        width: '640',
        videoId: thePlayer.ytid[1],
        playerVars: { 
          'enablejsapi': 1,
          'autoplay': 0, 
        },
        events: {
          'onStateChange': onPlayerStateChange
        }
      });

    },

    onPlayerStateChange = function(event) {
     
      s.theVideo = event.target;

      s.debug && console.log('VIDEO: ONPLAYERSTATECHANGE', s.theVideo, event.target);
      
    },

    playIt = function() {

      s.debug && s.theVideo && console.log('VIDEO: PLAYIT',s.theVideo);
      s.theVideo && s.theVideo.playVideo();

      els.theVideoPlayer.classList.add(s.classes.isPlaying);
    };

  return {
    init:init,
    loadPlayer:loadPlayer,
  };

}(window, window.document));

export { video };

