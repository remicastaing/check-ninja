'use strict';

(function(){

function NewFinding(NRF_Segment) {
    var ctrl = this;

    ctrl.create = function(){
      console.log('create finding');
      ctrl.selectedfinding = {HRI : ctrl.hri};
    };


}

angular.module('itechApp')
  .component('newFinding', {
    templateUrl: 'components/findings/new-finding/new-finding.html',
    controller: NewFinding,
    bindings: {
      hri : '<',
      selectedfinding: '=',
    }
  });

})();