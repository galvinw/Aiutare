var AmongApp = angular.module('poorau', ['ionic', 'angular-timeline', 'ngCordova', "firebase", 'poorau.controllers']);
var fb = new Firebase("https://amber-torch-8503.firebaseio.com/Packages/");
var auth = '';
var imagesdebug = [];
var mylong = '';
var mylat = '';
var PackageArray =[];
var imageData = '';



AmongApp.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});





AmongApp.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
 
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MenuCtrl'
  })

  .state('app.timeline', {
    url: "/timeline",
    views: {
      'menuContent': {
        templateUrl: "templates/timeline.html"
      }
    }
  })

  .state('app.friendprofile', {
    url: "/friendprofile",
    views: {
      'menuContent': {
        templateUrl: "templates/friendprofile.html"
      }
    }
  })

  .state('app.myprofile', {
    url: "/profile",
    views: {
        'menuContent' :{
            templateUrl: "templates/profile.html",
            controller: "ProfileCtrl"
        }
    }
  })

  .state('app.camera', {
    url: "/camera",
    views: {
        'menuContent' :{
            templateUrl: "templates/camera.html",
            controller: "CamCtrl"
        }
    }
  })

 .state('app.home', {
    url: "/home",
    views: {
        'menuContent' :{
            templateUrl: "templates/home.html",
            controller: "HomeCtrl"
        }
    }
  })

  $urlRouterProvider.otherwise('/app/home');
});
