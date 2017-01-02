
app.controller('RegisterController',['$scope','$location','RemoteStorageService','EncryptionService','DatabaseService',function($scope,$location,RemoteStorageService,EncryptionService,DatabaseService){





var encryptedObject = {};
var textBoxID = ["fullname","userid","email","mobile"];
var dbObject="";
var tableName ="UserRecord";
var databaseName = "Record";
var userKey = "";
$scope.inputPasswordType ="password";
//$scope.btnName ="Show";

clearRegistrationInput = function(){


                            $scope.user.userid="";
                            $scope.user.fullname="";
                            $scope.user.email="";
                            $scope.user.password="";
                            $scope.user.confirmpassword="";
                            $scope.user.mobile="";


};






$scope.hideRegPassword = function(){

  alert("asdasd");
/*
if($scope.inputPasswordType == 'password' ){

   $scope.inputPasswordType = "text";
   //$scope.btnName ="Hide";
}
else{

   $scope.inputPasswordType ="password";
  // $scope.btnName ="Show";
}
*/

};









$scope.saveDetails = function(){

var userData = $scope.user;

dbObject = DatabaseService.createRegistrationObject(databaseName);



var password = EncryptionService.generateHashKey(userData.password);

var IdentficationKey = EncryptionService.generateHashKey(userData.userid+password);

encryptedObject = EncryptionService.encryptUserData(userData,password,textBoxID);

encryptedObject['key'] = IdentficationKey ;

DatabaseService.addUserRecord(encryptedObject,dbObject,tableName);


  sessionStorage.setItem("UserKey",EncryptionService.generateHashKey(userData.password));
  sessionStorage.setItem("UserInfo",encryptedObject.key);
  sessionStorage.setItem("DatabaseName",EncryptionService.generateHashKey(userData.userid) );
RemoteStorageService.addRegDetailToRemote("Record",encryptedObject);
$location.path("/mainmodule" );

//clearRegistrationInput()

};





  }]);
