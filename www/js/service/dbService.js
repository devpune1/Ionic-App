

app.factory('DatabaseService',function($q){

var databaseObject = {};

databaseObject.createRegistrationObject = function(db_name){

  var Schema = {

  stores: [{

      name: 'UserRecord',    // required. object store name or TABLE name

      keyPath : 'key', // if true, key will be automatically created

  }


  ]


  };

  var dbObject = new ydn.db.Storage(db_name,Schema,{mechanisms: ['indexedDb']});

      return dbObject;



}

databaseObject.createUserDataObject = function(db_name){

  var Schema = {

  stores: [{

      name: 'UserSetting',    // required. object store name or TABLE name

      autoIncrement: true, // if true, key will be automatically created

  },
  {

      name: 'UserData',    // required. object store name or TABLE name

    keyPath : 'userdate', // if true, key will be automatically created

  },{


    name: 'IndexUserDate',    // required. object store name or TABLE name

    keyPath : 'userdate',



  }

  ]


  };

dbObject = new ydn.db.Storage(db_name,Schema,{mechanisms: ['indexedDb']});

      return dbObject;



}

databaseObject.addUserRecord = function(userDataObject,dbObject,tableName){

    dbObject.put(tableName,userDataObject).done( function() {

            console.log("entered")


         });

};

databaseObject.deleteUserRecord = function(userTable,userId,dbObject){

  dbObject.remove(userTable,userId).done(function(x) {

                  });
};

databaseObject.editUserRecord = function(tableName,userID,userDataObject,tableName){

  dbObject.put(tableName,userDataObject).done( function() {

          console.log("entered");


       });

};


databaseObject.fetchUserData = function(tableName,dbObject){


           var q = $q.defer(this);
           var record = [];
      var request =  dbObject.executeSql('SELECT * FROM '+ tableName).then (function(results) {

 if(results.length){

        for(numberOfItem = 0 ; numberOfItem < results.length ; numberOfItem++) {

            record.push(results[numberOfItem]);


}


  q.resolve(record);
}

 return record;


}, function(e) {

  throw e;


});



return request;





};

databaseObject.authentication = function(recordIdKey,tableName,dbObject,callback){


           var q = $q.defer(this);
           var record = [];
           var status ={};

     dbObject.executeSql('SELECT * FROM '+ tableName).then (function(results) {

            for(var value in results){

                if(results[value].key === recordIdKey){

                         status ={
                           state : true,
                          IdentficationKey : recordIdKey
                         };
                          break;

                }
                else{

                  status ={
                    state : false,
                   IdentficationKey :""
                  };


                }


            }

              callback(status);


});



};


databaseObject.getRecordById = function(tableName,userID,tableName){


      dbObject.get(tableName, userID).always(function(record) {
         console.log(record);
       });



};








 return databaseObject;

});
