


app.factory('ModalService',function(){

var modal = {};
var userData = {};

modal.getData= function(){


  return userData;


};


modal.setData =  function(userRecord){
  console.log("inside servixce");
console.log(userRecord);
  userData = userRecord;

};


return modal;


});
