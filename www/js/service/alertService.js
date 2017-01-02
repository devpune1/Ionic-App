app.factory('AlertService',function(  $ionicPopup){

var customAlert ={};




    customAlert.showAlert = function(messageTitle,message) {

    $ionicPopup.alert({
      title: messageTitle,
      template: message
    });


    return  customAlert;
};
});
