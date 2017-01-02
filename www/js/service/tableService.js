app.service('TableService',function($rootScope,DatabaseService,EncryptionService){

var tableService = {};




var databaseName = sessionStorage.getItem("DatabaseName");
var encryptionKey = sessionStorage.getItem("UserKey");
var tableName = "UserData";
var textBoxID = ["userid","userpassword","userwebsite","userhint"];
var currentDate ="";
var dbObject = DatabaseService.createUserDataObject(databaseName);

var userDetail = sessionStorage.getItem("UserInfo");







tableService.displayTable= function(){

  DatabaseService.fetchUserData(tableName,dbObject).then(function(results){

      var decryptUserData = [];
      var userDataObject ="";


                  for(var key in results){




                      userDataObject = EncryptionService.decryptUserData(results[key],encryptionKey,textBoxID)
                      userDataObject["userdate"] = results[key].userdate;
                      userDataObject["date"] =  results[key].date;
                        console.log(userDataObject)

                        decryptUserData.push(userDataObject);



                      $rootScope.records = decryptUserData;
                          $rootScope.$apply();


                    }





  });

  };




return tableService;



});
