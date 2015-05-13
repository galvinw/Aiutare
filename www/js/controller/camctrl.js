angular.module('poorau.controllers')



.controller('CamCtrl', function($scope, $cordovaCamera,$ionicHistory, $firebaseArray) {

    $ionicHistory.clearHistory();
    $scope.images = [];
    var userReference = fb.child("users/" + auth.uid);
    var ImageArray = $firebaseArray(userReference.child("Packages"));
    $scope.images = ImageArray;

    var src = "myMedia.mp3";
    var mediaRec = new Media(src, 
        // success callback
        function() {
            console.log("recordAudio():Audio Success");
        },

        // error callback
        function(err) {
            console.log("recordAudio():Audio Error: "+ err.code);
        });



     $scope.takePicture = function(){

        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
            };



        $cordovaCamera.getPicture(options).then(function(imageData) {
          ImageArray.$add({image: imageData}).then(function() {
              alert("Image has been uploaded");
          });
      }, function(error) {
          console.error(error);
      });
    };

      $scope.takeAudio = function() {
          // capture callback
      var captureSuccess = function(mediaFiles) {
          var i, path, len;
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
              path = mediaFiles[i].fullPath;
              console.log(path);
              // do something interesting with the file
          }
      };

      // capture error callback
      var captureError = function(error) {
          navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
      };

      // start audio capture
      navigator.device.capture.captureAudio(
        captureSuccess, captureError, {limit:1}

        );
  };

    $scope.takeMedia = function () {
    // Record audio
    mediaRec.startRecord();
    }

    $scope.releaseMedia = function (){
    mediaRec.stopRecord();


    }

});