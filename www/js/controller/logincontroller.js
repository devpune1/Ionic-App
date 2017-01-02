
    app.controller('LoginController',['$scope' ,'$location','EncryptionService','DatabaseService',function($scope,$location,EncryptionService,DatabaseService) {

var clearLoginInput = function(){


                   $scope.logininput.userid ="";
                    $scope.logininput.userpassword ="";

};


      $scope.login = function(){



                var userId  = $scope.logininput.userid;
                var userPassword =   $scope.logininput.userpassword;

                var count = 0;
                var sessionObject = {};

                dbObject = DatabaseService.createRegistrationObject('Record');





if(userId && userPassword){
  var userRecordkey = EncryptionService.generateHashKey(userId+(EncryptionService.generateHashKey(userPassword)));
DatabaseService.authentication(userRecordkey,'UserRecord',dbObject,function(response){



  if (response.state) {

    sessionStorage.setItem("UserKey",EncryptionService.generateHashKey(userPassword));
     sessionStorage.setItem("UserInfo",userRecordkey);
      sessionStorage.setItem("DatabaseName",EncryptionService.generateHashKey(userId) );

    $location.path("/mainmodule" );
}
else {

  $scope.logininput.userid ="";
   $scope.logininput.userpassword ="";

 alert("User Id Or  User Password Incorrect");

}


});

}
else{

  alert("Input Fields Cannot Be Empty");






}


      };

  }]);
