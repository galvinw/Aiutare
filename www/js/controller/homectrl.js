angular.module('poorau.controllers')



.controller('HomeCtrl', function($scope,$ionicHistory, $ionicModal,$cordovaGeolocation,$cordovaImagePicker,$firebaseArray) {

    $ionicHistory.clearHistory();
    // $scope.images = [];
    // var userReference = fb.child("users/" + auth.uid);
    // var syncArray = $firebaseArray(userReference.child("images"));
    // $scope.images = syncArray;
    // imagesdebug = syncArray;


    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    var locationpromise = $cordovaGeolocation
                            .getCurrentPosition(posOptions)
                            .then(function (position) {
                           mylong = position.coords.longitude;
                           mylat = position.coords.latitude;
                          mylocation = [mylat,mylong];
                            }, function(err) {
                              // error
                            });


    var options = {
       maximumImagesCount: 1,
       width: 800,
       height: 800,
       quality: 80
      };

    $scope.packages = [];
    $scope.init = {};
    $scope.newcompany = {};


    PackageArray = $firebaseArray(fb);

    PackageArray.$loaded().then(function(PackArray){

        $scope.packages = PackArray;

        // console.log($scope.packages.length);
    })
    .catch(function(error) {
      console.log("Error:", error);
    });



    $scope.doRefresh = function() {
     // alert("refreshComplete");
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
         mylong = position.coords.longitude;
         mylat = position.coords.latitude;
         $scope.$broadcast('scroll.refreshComplete'); 

        }, function(err) {
          // error
          console.log("Error:", err);
        });
     // syncArray = $firebaseArray(userReference.child("images"));
     // $scope.images = syncArray;
     // imagesdebug = syncArray;
     };


     $scope.uploadpic = function(){
       //  ABX = document.createElement("img");
       //  // img.src = "cover.jpg";
       // setTimeout(function(){
       //    ABX.src = "cover.jpg";
       //    setTimeout(function(){
                 
       //           getImageDataURL(ABX, function (data) {
       //           imageData = data;
       //           console.log(data);
       //           });
       //         },4000);



       // },2000);

       

          // getImageDataURL(img, function (data) {
          //       imageData = data;
          //       console.log("i: " + data);
          //     });
          //     console.log(imageData);


        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            //  imageData = convertpicture(results[0]);
            var img = document.createElement("img");
             setTimeout(function(){
           img.src = results[0];
              setTimeout( function(){
                 getImageDataURL(img, function (data) {
                 imageData = data;
                 console.log(data);
                 });
              },5000)
            },4000)

            
          }, function(error) {
            // error getting photos
             console.log("Error:", err);
           });

      };

     $scope.submit = function(init) {

      $scope.newcompany = angular.copy(init)
       $scope.newcompany.image = imageData;

      console.log($scope.newcompany);

        PackageArray.$add({ 

          creator: auth.uid,
          latitude: $scope.newcompany.lat,
          longitude: $scope.newcompany.long,
          name: $scope.newcompany.companyname,
          email: $scope.newcompany.email,
          tel: $scope.newcompany.phone,
          image: $scope.newcompany.image


      }).then(function(ref) {
            var id = ref.key();
            console.log("added record with id " + id);
            PackageArray.$indexFor(id); // returns location in the array
          });
     }

     $scope.gethere = function() {
      $scope.init.lat = mylat;
      $scope.init.long = mylong;

     }

    $ionicModal.fromTemplateUrl('templates/addcompany.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });  

});

