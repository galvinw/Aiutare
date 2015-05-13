angular.module('poorau.controllers')

.controller("ProfileCtrl", function($scope) {
    // put our profile in the scope for use in DOM
    $scope.profile = auth.facebook.displayName;

    // calling $save() on the synchronized object syncs all data back to Firebase
    $scope.saveProfile = function() {
      $scope.profile.$save().then(function() {
        alert('Profile saved to Firebase!');
      }).catch(function(error) {
        alert('Error!');
      });
    };
  }
)