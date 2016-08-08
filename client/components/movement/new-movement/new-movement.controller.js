'use strict';

(function(){

var modalInstance;

function NewMovement($uibModal, InstalledPart, PAR_Segment, IPT_Segment) {
    var ctrl = this;
      

    InstalledPart.findAll(
      {
        where: {
          'AIN': {
            '==': ctrl.ain
          }
        },
        orderBy: 'index'
      }).then(function(parts){
        ctrl.parts = parts;
      });

    ctrl.animationsEnabled = true;

    ctrl.createMovement = function (size) {
        modalInstance = $uibModal.open({
        animation: ctrl.animationsEnabled,
        templateUrl : 'components/movement/new-movement/new-movement.modal.html',
        controller: 'ModalInstanceController',
        controllerAs : '$ctrl',
        size: 'lg',
        resolve: {
          parts: function () {
            return ctrl.parts;
          },
          editRemoval: function () {
            return editRemoval;
          },
          editInstallation: function () {
            return editInstallation;
          },
        }
      });
    };

    function editRemoval(position){
      switch (position.status) {
        case 'original':
          ctrl.removal = position.initRemoval(ctrl.hri);
          break;
        case 'removed':
          PAR_Segment.findAll({where:{'position': { "==" : position.id}}})
            .then(function(par){
              ctrl.removal = par[0];
            })
          break;
      }
      modalInstance.close();
    }

    function editInstallation(position){
      if (InstalledPart.is(position)) {
        ctrl.installation = position.initInstallation(ctrl.hri);
      } else if (false) {

      }
      modalInstance.close();      
    }


}

    function modalInstanceController($uibModal, parts, editRemoval, editInstallation) {
      var ctrl = this;
      ctrl.parts = parts;
      ctrl.editRemoval = editRemoval;
      ctrl.editInstallation = editInstallation;
      ctrl.close = modalInstance.close;
    }

angular.module('itechApp')
  .component('newMovement', {
    templateUrl: 'components/movement/new-movement/new-movement.html',
    controller: NewMovement,
    bindings: {
      hri : '=',
      ain : '=',
      removal : "=",
      installation : "=",
      inter: "="
    }
  })
  .controller('ModalInstanceController', modalInstanceController);

})();