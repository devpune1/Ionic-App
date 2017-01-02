
(function(){


app.factory('EncryptionService',function(){

var encryptFactory = {};


/* Encrypting Data  */

encryptFactory.encryptUserData = function(userDataObject,userEncryptionKey,textBoxID){

  var encryptedObject = {};
  var textIdName ="";
  var userData = "";





for (var items = 0 ; items < textBoxID.length; items++){

if(encryptFactory.createSensitiveDataArray(textBoxID[items])){

        textIdName = textBoxID[items];
        userData = JSON.stringify(userDataObject[textIdName]);
        encryptedObject[textIdName] = encryptFactory.encryptData(userEncryptionKey, userData);

    }
    else{
          textIdName = textBoxID[items];
          userData = (userDataObject[textIdName]);
          encryptedObject[textIdName] =  userData;

    }

}

console.log( encryptedObject)
return    encryptedObject;

};


/* Decrypting Data

*/
encryptFactory.decryptUserData = function(userDataObject,userEncryptionKey,textBoxID){

  var decryptedObject = {};
  var textIdName ="";
  var userData = "";



      for (var items = 0 ; items < textBoxID.length; items++){

        if(encryptFactory.createSensitiveDataArray(textBoxID[items])){

                textIdName = textBoxID[items];
                userData = userDataObject[textIdName];
              decryptedObject[textIdName] = encryptFactory.decryptData(userEncryptionKey, userData);

            }
            
            else{
                  textIdName = textBoxID[items];
                  userData = (userDataObject[textIdName]);
                decryptedObject[textIdName] =  userData;

            }



    }

return decryptedObject;


};



encryptFactory.generateHashKey = function(userKey)
{

  var hashedKey = null;

   hashedKey = sjcl.hash.sha256.hash(userKey);

    hashedKey = sjcl.codec.hex.fromBits(hashedKey);

  return hashedKey;


};
encryptFactory.encryptData = function(userEncryptionKey,userDataObject)
{
    var encryptedData = "";

    encryptedData = sjcl.encrypt(userEncryptionKey,userDataObject);

    return encryptedData;
};

encryptFactory.decryptData = function(userEncryptionKey,userDataObject)
{

  var decryptedData = "";

  decryptedData = sjcl.decrypt(userEncryptionKey,userDataObject);

 decryptedData = JSON.parse(decryptedData);

  return decryptedData;

};

/*Separating user data with sensitive and unsensitive */



encryptFactory.createSensitiveDataArray = function(textBoxID){

  var items = 0;

  var sensitiveFieldArray = ["username","userpassword"];

    switch (textBoxID) {

      case "userwebsite":

          return false;

        break;
        case "userhint":

          return false;

          break;
          case "userdate":
            return false;

            break;

            case "date":

                return false;

              break;


      default:

      return true;

    break;

    }





};


return  encryptFactory;


});
})();
