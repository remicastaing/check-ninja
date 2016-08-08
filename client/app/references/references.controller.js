'use strict';
(function(){

function ReferencesComponent($scope) {
  $scope.message = 'Hello';
}

angular.module('itechApp')
  .component('references', {
    templateUrl: 'app/references/references.html',
    controller: ReferencesComponent
  });

})();
