
app.directive('confirmPassword',function(){
  return{
    require: 'ngModel',
    scope: {
			password: '=confirmPassword'
		},
    link: function(scope, elm, attrs, ctrl){
      ctrl.$validators.confirmPassword = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        return (modelValue === scope.password);
      };

      // If the user changes the password, then we have to re-validate the confirm password input
      scope.$watch('password', function() {
        if(scope.password) ctrl.$validate();
      });
    }
  };
})
