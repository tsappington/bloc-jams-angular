(function() {
    function SongPlayer() {
         var SongPlayer = {};

         /**
         * @desc Song object
         * @type {Object}
         */
         var currentSong = null;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;


         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
         };


         /**
         * @function playSong
         * @desc Plays currently selected song loaded by currentBuzzObject
         * @type {Object} song
         */
         var playSong = function(song) {
           currentBuzzObject.play();
           song.playing = true;
         };


         /**
         * @function play
         * @desc Plays song, stopping previous song, if another song is currently playing
         * @type {Object} song
         */
         SongPlayer.play = function(song) {
           if (currentSong !== song) {
             setSong(song);
             playSong(song);
           } else if (currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                  currentBuzzObject.play();
              }
          }
         };


         /**
         * @function pause
         * @desc Pauses currently playing song
         * @type {Object} song
         */
         SongPlayer.pause = function(song) {
             currentBuzzObject.pause();
             song.playing = false;
         };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
