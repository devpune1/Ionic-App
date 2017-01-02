



  RemoteStorage.defineModule('bicnSystCorp', function(privateClient) {

  privateClient.declareType('Data', {

    type: 'object',
    description : 'User Data',
    properties: {


        userid : { type : 'string'},

    userpassword : { type : 'string'},

      userwebsite: { type:'string' },

      userhint: { type: 'string' },

      userdate : {type : 'number'}


    },

    required: ['userid']

  });

  return {


    exports: {

         profile : null,

      init: function(profile) {


       privateClient.cache('');

        this.profile = profile;



      },

      on: privateClient.on,

      addUserData : function(type,Id,userData) {

        var Id = Id.toString().replace(/\s|\//g, '-');

        return privateClient.storeObject('Data',this.profile + '/'+Id,userData);
        console.log("her")

      },


      editUserData: function(userId,userData) {

       userId = userId.toString().replace(/\s|\//g, '-');

         return privateClient.storeObject('Data',this.profile+"/"+userId,userData);



      },

      removeUserData: function(userId) {

         userId = userId.toString().replace(/\s|\//g, '-');

          return  privateClient.remove(this.profile+"/"+userId);
      },

      getUserData: function() {

        return privateClient.getAll(this.profile + '/');

      },


     getById: function(obj) {


             //obj = obj.toString().replace(/\s|\//g, '-');

              return privateClient.getObject(obj);

                }




    }
  };

});
