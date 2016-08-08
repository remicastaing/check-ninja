'use strict';
(function(){

function Button() {
  var ctrl = this;

  ctrl.click = function(){
    ctrl.onEdit({position : ctrl.part});
  }

}

angular.module('itechApp')
  .component('removalButton', {
    templateUrl: 'components/movement/removal-installation-button/removal-button.html',
    controller: Button,
    bindings: {
      part: '=',
      onEdit: '&'
    }
  })
  .component('installationButton', {
    templateUrl: 'components/movement/removal-installation-button/installation-button.html',
    controller: Button,
    bindings: {
      part: '=',
      onEdit: '&'
    }
  });

})();
