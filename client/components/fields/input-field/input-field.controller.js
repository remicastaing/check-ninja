'use strict';
(function(){

function InputField() {
  var vm = this;


}



angular.module('itechApp')
  .component('inputField', {
    templateUrl: 'components/fields/input-field/input-field.html',
    controller: InputField,
    bindings: {
      label: '@',
      var: '=',
      labelclass : '@',
      varclass : '@'
    }
  });

})();
