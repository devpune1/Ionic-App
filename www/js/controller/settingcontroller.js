

 app.controller('SettingCtrl', function($scope,$rootScope,$state,$ionicSideMenuDelegate) {
    $scope.open = function() {
        $state.go('template', {});
    };
    $ionicSideMenuDelegate.canDragContent(false);


});


app.controller('aboutCtrl', function($scope,$rootScope,$ionicSideMenuDelegate,ChangeUserProfile) {



ChangeUserProfile.changeFullUserName($rootScope);


   $scope.openMenuLeft = function() {

        $ionicSideMenuDelegate.toggleLeft();
    };


});


 app.controller('ChangeProfile', function($scope, $ionicPopup,$rootScope,EncryptionService,DatabaseService,ChangeUserProfile) {


      var textBoxID = ["fullname","userid","email","mobile"];
      var userDetail = sessionStorage.getItem("UserInfo");
      var encryptionKey = sessionStorage.getItem("UserKey");
      var databaseName = "Record";
      var tableName = "UserRecord";

      var  dbObject = DatabaseService.createRegistrationObject(databaseName);

      console.log(userDetail);



      function setUserProfile(){



      DatabaseService.fetchUserData('UserRecord',dbObject).then(function(records){


      for(key in records){

          if(records[key].key === userDetail ){


                var data = (EncryptionService.decryptUserData(records[key],encryptionKey,textBoxID));

                setProfile(data);
                $scope.$apply();

              }

      }

      });

      }


      setUserProfile();


            function setProfile(profileObject){


                $scope.profile.fullname = profileObject.fullname;
                $scope.profile.userid = profileObject.userid;
                $scope.profile.email = profileObject.email;
                $scope.profile.mobile = profileObject.mobile;



            }





  $scope.updateProfile = function(){


    var userData = $scope.profile;
    var IdentficationKey= EncryptionService.generateHashKey(userData.userid+encryptionKey);

    encryptedObject = EncryptionService.encryptUserData(userData,encryptionKey,textBoxID);
    encryptedObject['key'] = IdentficationKey ;


if(IdentficationKey === userDetail){

          DatabaseService.addUserRecord(encryptedObject,dbObject,tableName);

  }
else{

          DatabaseService.addUserRecord(encryptedObject,dbObject,tableName);
          DatabaseService.deleteUserRecord(tableName,userDetail,dbObject);




}
  sessionStorage.setItem("UserInfo",IdentficationKey);

  ChangeUserProfile.changeFullUserName($rootScope);
  } ;

});


/*Change User password*/

 app.controller('ChangePassword', function($scope, $ionicPopup,EncryptionService,ChangeUserProfile) {


      var encryptionKey = sessionStorage.getItem("UserKey");
   $scope.inputType ="password";
   $scope.btnName ="Show";

   function clearPasswords(){


       $scope.profilepwd.oldpassword = "";
       $scope.profilepwd.newpassword = "";
       $scope.profilepwd.confirmpassword = "";


   }





$scope.hidePassword = function(){

if($scope.inputType == 'password'){

      $scope.inputType = "text";
      $scope.btnName ="Hide";
}
else{

      $scope.inputType ="password";
      $scope.btnName ="Show";
}


}

$scope.updatePassword = function(){

var enteredPassword = $scope.profilepwd;
var oldPassword = EncryptionService.generateHashKey(enteredPassword.oldpassword);
var newPassword =  EncryptionService.generateHashKey(enteredPassword.newpassword);


if(oldPassword === encryptionKey ){


    ChangeUserProfile.applyPasswordData(oldPassword,newPassword);
    clearPasswords();
}
else{

      ChangeUserProfile.showAlert("Error","Old password do not match")



      clearPasswords()
}


};

});
