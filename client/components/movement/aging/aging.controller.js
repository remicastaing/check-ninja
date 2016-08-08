'use strict';
(function(){

function Aging() {
  var vm = this;

  

  vm.posATT = {};
  _(vm.att).forEach(function(att, key){
    vm.posATT[att.TRF]=key; 
  });

  

  // vm.NSC = _.uniq(_.map(vm.atn,function(atn){ return atn.NSC}));

  // vm.posATN = {}

  //  _(vm.atn).forEach(function(atn, key){
  //   _.set(vm.posATN,atn.TRF+'.'+atn.NSC ,key);
  // }); 

   vm.$doCheck = function () {
    vm.NSC = _.uniq(_.map(vm.atn,function(atn){ return atn.NSC}));

      vm.posATN = {}

       _(vm.atn).forEach(function(atn, key){
        _.set(vm.posATN,atn.TRF+'.'+atn.NSC ,key);
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
