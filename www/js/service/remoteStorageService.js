





app.factory('RemoteStorageService',['DatabaseService','TableService',function(DatabaseService,TableService){

var remoteObject = {};


remoteObject.loadRemoteStorageData = function(databaseName,dbObject,tableName,userFolderName){

  var userProfile = databaseName;

  var db = dbObject;

  var recordsUser = [];

  RemoteStorage.config.changeEvents.window = false;


 remoteStorage.access.claim('bicnSystCorp','rw');


 remoteStorage.displayWidget();

 remoteStorage.bicnSystCorp.init(userFolderName+"/"+userProfile);

 remoteStorage.bicnSystCorp.getUserData().then(function(userData){

console.log("above for");

  for(var key in userData){

//recordsUser[key] = userData[key];
console.log("insinde for");
//DatabaseService.addUserRecord(userData[key],db,tableName);

remoteObject.removeDuplicate(userData[key],db,tableName);

}





});


};


remoteObject.removeDuplicate = function(userData,db,tableName){






  DatabaseService.fetchUserData(tableName,db).then(function(userDatabaseData){

    if(userData.length  && userData.userdate){



      for(var key in userDatabaseData){

              if(userData.userdate != userDatabaseData[key].userdate){

                  DatabaseService.addUserRecord(userData,db,tableName);

              }


      }
}
else{
      if(userData){

    DatabaseService.addUserRecord(userData,db,tableName);
}

  }


    });

//TableService.displayTable();


};

remoteObject.addRegDetailToRemote = function(regUserId,regUserData){


remoteStorage.bicnSystCorp.init('RegistrationRecord');
remoteStorage.bicnSystCorp.addUserData('Record',regUserId,regUserData);



};



 return remoteObject;

}]);
