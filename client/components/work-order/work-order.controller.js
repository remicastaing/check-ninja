(function() {
  'use strict';



  angular
    .module('itechApp')
    .controller('WorkOrderController', WorkOrderController);

  function WorkOrderController($scope)  {
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

    vm.popup = {
      TED : {opened: false}
    };

    vm.open = function (field) {
      vm.popup[field].opened = true;
    };

    vm.maxDate = new Date(2020, 5, 22);
    vm.minDate = null;

    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    vm.disabled = disabledCalendar;

    vm.save = function() {
      wo.DSUpdate(wo)
      .then(function(data){
      },
      function(err){console.log(err);});
    };

  };

function disabledCalendar(date, mode) {
  return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
};

})();