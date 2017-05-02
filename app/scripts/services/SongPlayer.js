(function() {
    function SongPlayer(Fixtures) {
         var SongPlayer = {};

         /**
         * @desc Sets currentAlbum to albumPicasso
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();


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
                stopSong(song);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
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
         * @function stopSong
         * @desc Stops currently selected song loaded by currentBuzzObject
         * @type {Object} song
         */
         var stopSong = function(song) {
           currentBuzzObject.stop();
           SongPlayer.currentSong.playing = null;
         };


         /**
         * @function getSongIndex
         * @desc Get album's currently playing song index
         * @type {Object} song
         */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };


         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
         SongPlayer.currentSong = null;


         /**
         * @function play
         * @desc Plays song, stopping previous song, if another song is currently playing
         * @type {Object} song
         */
         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
             setSong(song);
             playSong(song);
           } else if (SongPlayer.currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                  playSong(song);
              }
          }
         };


         /**
         * @function pause
         * @desc Pauses currently playing song
         * @type {Object} song
         */
         SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };


         /**
         * @function previous
         * @desc Plays previous song, in album's index
         * @type {Object}
         */
         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 stopSong(song);
               } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
               }
         };


         /**
         * @function next
         * @desc Plays next song, in album's index
         * @type {Object}
         */
         SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;

             if (currentSongIndex >= currentAlbum.songs.length) {
                 stopSong(song);
               } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
               }
         };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
