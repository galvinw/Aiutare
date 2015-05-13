angular.module('poorau.controllers', [])

.controller('MenuCtrl', function($scope, $firebaseAuth,$timeout) {
    $scope.fbAuth = $firebaseAuth(fb) ;

  // Form data for the login modal
 
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });



  $scope.fbLogin = function() {
     //   alert("login");

   $scope.fbAuth.$authWithOAuthPopup("facebook", 
   {
      remember: "default",
      scope: 'public_profile,email,publish_actions,user_likes'
   }).then (
      function(authData) {
       // alert("success");
        auth = $scope.fbAuth.$getAuth()
        $scope.loggedin = true;
        console.log("Authenticated successfully with payload:", authData);
      }) .catch(function(error){
        console.log("Login Failed!", error);
        alert("fail");
      } );

  };

})