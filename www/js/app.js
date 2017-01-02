// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



app.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'template/login.html',
                  controller :"LoginController",

            })
            .state('registration', {
                url: '/registration',
                templateUrl: 'template/registration.html',
                controller :"RegisterController",

            })
            .state('mainmodule', {
                url: "/mainmodule",
                templateUrl: "template/mainmodule.html",

              controller :"ModalCtrl"

            }).state('setting', {
            url: '/setting',

            controller: 'SettingCtrl',

            templateUrl: 'template/setting.html'
        })
        .state('about', {
            url: '/about',
            controller: 'aboutCtrl',
            templateUrl: 'template/about.html'
        })
        .state('remotelogin', {
            url: '/remotelogin',
              controller: 'RemoteController',
            templateUrl: 'template/remotelogin.html'
        });

        $urlRouterProvider.otherwise('login');
    });


    app.controller('LoginController',['$scope' ,'$location','EncryptionService','DatabaseService',function($scope,$location,EncryptionService,DatabaseService) {

var clearLoginInput = function(){


                   $scope.logininput.userid ="";
                    $scope.logininput.userpassword ="";

};


      $scope.login = function(){



                var userId  = $scope.logininput.userid;
                var userPassword =   $scope.logininput.userpassword;
                var userRecordkey = EncryptionService.generateHashKey(userId+userPassword)
                var count = 0;
                var sessionObject = {};

         dbObject = DatabaseService.createRegistrationObject('Record');

      DatabaseService.fetchUserData('UserRecord',dbObject).then(function(records){


                    for(var item in records){
                            console.log(records[item].key);
                              console.log(userRecordkey);

                      if(records[item].key === userRecordkey){

                        count = count + 1;

                        break;
                      }



                    }

                    if(count){


                      sessionStorage.setItem("UserKey",EncryptionService.generateHashKey(userPassword));

                        sessionStorage.setItem("DatabaseName",EncryptionService.generateHashKey(userId) );

                      $location.path("/mainmodule" );
                      clearLoginInput();
                    }
                    else{

                      $scope.logininput.userid ="";
                       $scope.logininput.userpassword ="";

                    //  alert("User Id Or  User Password Incorrect");

                    }



      });

      };

  }]);
