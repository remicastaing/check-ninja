(function() {
  'use strict';



  angular
    .module('itechApp')
    .controller('WorkOrderController', WorkOrderController);

  function WorkOrderController($scope, $state, AWR_Segment)  {
    var vm = this;
		
    var wo;
  
    if (typeof $scope.data.then === 'function'){
      $scope.data.then(function(data){
        wo = data;
        vm.wo = wo;
      })
    } else {
      wo = $scope.data;
      vm.wo = wo;
    }

    vm.save = function() {
      console.log(wo);
      wo.DSUpdate(wo)
      .then(function(data){
        console.log('save');
        $state.go('check', {WPI: wo.WPI});
      },
      function(err){console.log(err);});
    };

  };

})();