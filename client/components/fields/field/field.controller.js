'use strict';
(function(){

function Field() {
  var vm = this;


}



angular.module('itechApp')
  .component('field', {
    templateUrl: 'components/fields/field/field.html',
    controller: Field,
    bindings: {
      label: '@',
      var: '=',
      labelclass : '@',
      varclass : '@'
    }
  });

})();
