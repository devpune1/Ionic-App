app.factory('ChangeUserProfile',function( $ionicPopup,DatabaseService,EncryptionService,RemoteStorageService){

var applyPassword ={};




   applyPassword.showAlert = function(messageTitle,message) {

    $ionicPopup.alert({
      title: messageTitle,
      template: message
    });
};












 applyPassword.setPasswordToProfile = function(userProfileData,dbObject,oldProfileKey){


            DatabaseService.deleteUserRecord('UserRecord',oldProfileKey,dbObject);
            DatabaseService.addUserRecord(userProfileData,dbObject,'UserRecord');



};


 applyPassword.applyPasswordProfile = function(newPassword){


   var databaseName = "Record";
   var userInfoKey =  sessionStorage.getItem("UserInfo");
   var textBoxID = ["fullname","userid","email","mobile"];
   var dbObject = DatabaseService.createRegistrationObject(databaseName);
   var oldPassword = sessionStorage.getItem("UserKey");
   var userData = {};
   var userDataObject = {};
   var userEncryptionData = [];


   DatabaseService.fetchUserData("UserRecord",dbObject).then(function(records){


   for(var key in records){

      if(records[key].key == userInfoKey){

        userData =  EncryptionService.decryptUserData(records[key],oldPassword,textBoxID);
         console.log(userData)
        userDataObject =  EncryptionService.encryptUserData(userData,newPassword,textBoxID);
        userDataObject['key'] = EncryptionService.generateHashKey(userData.userid+newPassword)



      }

   }

    applyPassword.setPasswordToProfile(userDataObject,dbObject,userInfoKey);

    sessionStorage.setItem("UserKey",newPassword);
    sessionStorage.setItem("UserInfo",userDataObject.key);
});

};
/* Store data to database with new password applied */

applyPassword.setPasswordToData = function(userData,dbObject){
  var items=0;


console.log(userData)

      for( items = 0; items<userData.length; items++){

            console.log(userData[items])
            console.log(dbObject)
           DatabaseService.addUserRecord(userData[items],dbObject,'UserData');

          remoteStorage.bicnSystCorp.addUserData('Data',userData[items].userdate,userData[items]);

      }




};
/* apply new password to records stored in data base. */




 applyPassword .applyPasswordData = function(oldPassword,newPassword){

var databaseName =  sessionStorage.getItem("DatabaseName");
var textBoxID = ["userid","userpassword","userwebsite","userhint"];
var dbObject = DatabaseService.createUserDataObject(databaseName);
var userData = {};
var userDataObject = {};
var userEncryptionData = [];


DatabaseService.fetchUserData("UserData",dbObject).then(function(records){


for(var key in records)
{


userData =  EncryptionService.decryptUserData(records[key],oldPassword,textBoxID);

userDataObject =  EncryptionService.encryptUserData(userData,newPassword,textBoxID);
userDataObject['userdate'] = records[key].userdate;
userDataObject['date'] = records[key].date;
userEncryptionData.push(userDataObject);


}
console.log(userEncryptionData);

applyPassword.setPasswordToData(userEncryptionData,dbObject);

applyPassword.applyPasswordProfile(newPassword);

});




};

applyPassword.changeFullUserName = function(object){



   var textBoxID = ["fullname","userid","email","mobile"];
  var userDetail = sessionStorage.getItem("UserInfo");
  var encryptionKey = sessionStorage.getItem("UserKey");




  var dbObject =  DatabaseService.createRegistrationObject("Record");

  DatabaseService.fetchUserData('UserRecord',dbObject).then(function(records){

      console.log("herer")
  for(key in records){

  if(records[key].key == userDetail ){

        console.log(records[key])

          var userRegData = EncryptionService.decryptUserData(records[key],encryptionKey,textBoxID);
          console.log(userRegData)

        //  RemoteStorageService.addRegDetailToRemote(userDetail,records[key]);
          console.log(userRegData.fullname)
          object.userName = userRegData.fullname ;
        object.$apply();


  }

  }


  });





};




return  applyPassword ;

});
