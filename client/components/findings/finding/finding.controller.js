'use strict';

(function(){

function Finding(NRF_Segment) {
    var ctrl = this;

    ctrl.close = function(){
      delete ctrl.finding;
    };

    ctrl.save = function(){
      NRF_Segment.create(ctrl.finding).then(function(){
        delete ctrl.finding;
      }, function(err){console.log(err)});
      
    }

    ctrl.delete = function(){
      NRF_Segment.destroy(ctrl.finding.id).then(function(){
        delete ctrl.finding;
      }, function(err){console.log(err)});
    }


}

angular.module('itechApp')
  .component('finding', {
    templateUrl: 'components/findings/finding/finding.html',
    controller: Finding,
    bindings: {
      finding: '=',
    }
  });

})();