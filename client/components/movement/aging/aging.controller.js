'use strict';
(function(){

function Aging() {
  var ctrl = this;

  

  ctrl.posATT = {};
  _(ctrl.att).forEach(function(att, key){
    ctrl.posATT[att.TRF]=key; 
  });


   ctrl.$doCheck = function () {

    ctrl.NSC = _.uniq(_.map(ctrl.atn,function(atn){ return atn.NSC}));

      ctrl.posATN = {}

       _(ctrl.atn).forEach(function(atn, key){
        _.set(ctrl.posATN,atn.TRF+'.'+atn.NSC ,key);
      });


  };


}

angular.module('itechApp')
  .component('aging', {
    templateUrl: 'components/movement/aging/aging.html',
    controller: Aging,
    bindings: {
      att: '=',
      atn: '='
    }
  });

})();
