



app.controller("RemoteController",['$scope','$location','DatabaseService','RemoteStorageService',function($scope,$location,DatabaseService,RemoteStorageService){

  var tableName = "UserRecord";
  var folderName ="RegistrationRecord";
  var databaseName = "Record"



  var dbObject = DatabaseService.createRegistrationObject(databaseName);


  var userProfile = databaseName;

  var db = dbObject;

$scope.connect =function(){

/*
var userAddress = $scope.remoteinput.userid;


  if ( userAddress !== undefined) {
alert(""+userAddress)
     //remoteStorage.widget.view.set(userAddress);


            } else
            {
                alert("Error : Input Field Cannot Be Empty");
            }


};

*/
  RemoteStorage.config.changeEvents.window = false;


 remoteStorage.access.claim('bicnSystCorp','rw');


 remoteStorage.displayWidget();

 remoteStorage.bicnSystCorp.init(folderName+"/"+databaseName);


 remoteStorage.bicnSystCorp.getById(folderName+"/"+databaseName).then(function(results){

if(results) {

DatabaseService.addUserRecord(results,db,tableName);

$location.path('/login');

}


});


};



//remoteObject.removeDuplicate(userData[key],db,tableName);
$scope.connect();



}]);
