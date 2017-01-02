


app.controller('MainModuleController',['$scope','$ionicModal','$ionicHistory','TableService','ModalService','RemoteStorageService','EncryptionService','DatabaseService',function($scope,$ionicModal,$ionicHistory,TableService,ModalService,RemoteStorageService,EncryptionService,DatabaseService){





var databaseName = sessionStorage.getItem("DatabaseName");
var encryptionKey = sessionStorage.getItem("UserKey");

var tableName = "UserData";
var folderName ="Records";
var textBoxID = ["userid","userpassword","userwebsite","userhint"];
var currentDate ="";
var dbObject = DatabaseService.createUserDataObject(databaseName);

var userDetail = sessionStorage.getItem("UserInfo");

console.log(sessionStorage.getItem("UserInfo"));





RemoteStorageService.loadRemoteStorageData(databaseName,dbObject,tableName,folderName);



TableService.displayTable();






function clearMainModule(){

$scope.main.userid="";
$scope.main.userpassword="";
$scope.main.userwebsite="";
$scope.main.userhint="";
$scope.displayRecord();

TableService.displayTable();






};


$scope.addRecord = function(){

  var userData = EncryptionService.encryptUserData($scope.main,encryptionKey,textBoxID);


  userData["userdate"] =  new Date().getTime();
  userData['date'] = epochToDate(userData.userdate);

  remoteStorage.bicnSystCorp.addUserData('Data',userData.userdate,userData);

  DatabaseService.addUserRecord(userData,dbObject,tableName);

clearMainModule();


TableService.displayTable();


};


$scope.clearRecord = function(){

            dbObject.clear(tableName).done(function() {

          alert("All Records Inside Database  Cleared");


    });

    TableService.displayTable();
};




  function epochToDate(userEpochDate){


      var userDate =new Date(userEpochDate);
      var userDateRow = "";

      userDate =  properDate(userDate.getDate()) + "/" + properDate(userDate.getMonth() + 1)  +"/" +userDate.getFullYear();

      userDateRow = userDate;

      return   userDateRow;


  }

  function properDate(userEnteredDate){



      if(userEnteredDate < 10){



          return '0' + userEnteredDate;


      }
      else{

          return userEnteredDate ;

      }




  }
  $scope.openMenuLeft = function() {

       $ionicSideMenuDelegate.toggleLeft();
   };






//***** Display Records of user ******//


$scope.displayRecord = function(){

DatabaseService.fetchUserData(tableName,dbObject).then(function(results){

    var decryptUserData = [];
    var userDataObject ="";

                for(var key in results){

                    userDataObject = EncryptionService.decryptUserData(results[key],encryptionKey,textBoxID)
                    userDataObject["userdate"] = results[key].userdate;
                      userDataObject["date"] =  results[key].date;
                      console.log(userDataObject)

                      decryptUserData.push(userDataObject);

                      $scope.records = decryptUserData;



                  }






});
TableService.displayTable();
};

//***** Delete Records of user ******//

$scope.deleteRecord = function(id){



remoteStorage.bicnSystCorp.removeUserData(id);

DatabaseService.deleteUserRecord(tableName,id,dbObject);

$scope.displayRecord();

TableService.displayTable();

};


$ionicModal.fromTemplateUrl('template/modal.html', function(modal) {
  $scope.modalCtrl = modal;
}, {
  scope: $scope,
  animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
  controller : 'ModalCtrl',
  focusFirstInput: true
});
$scope.openModal = function(user) {


  $scope.user = user;

  $scope.modalCtrl.show();

};
$scope.hideModal = function() {


    $scope.modalCtrl.hide();


};

//***** Edit  Records of user ******//




$scope.applyModal = function(user) {


  $scope.deleteRecord(user.userdate);
  remoteStorage.bicnSystCorp.removeUserData(user.userdate);

var userData = EncryptionService.encryptUserData(user,encryptionKey,textBoxID);

userData["userdate"] =  new Date().getTime();
userData['date'] = epochToDate(userData.userdate);


remoteStorage.bicnSystCorp.addUserData('Data',userData.userdate,userData);
DatabaseService.addUserRecord(userData,dbObject,tableName);

$scope.hideModal();
TableService.displayTable();
};


myGoBack = function() {
    $ionicHistory.goBack();
  };





}]);





app.controller('ModalCtrl', function($scope) {




 });
