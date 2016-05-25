(function() {
  'use strict';



  angular
    .module('itechApp')
    .controller('CardController', CardController);

  function CardController($scope, NRF_Segment, HCD_Segment)  {
    var vm = this;
		
    var card;
  
    if (typeof $scope.data.then === 'function'){
      $scope.data.then(function(data){
        card = data;
        vm.card = card;
        console.log(card);
      })
    } else {
      card = $scope.data;
      vm.card = card;
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
      card.DSUpdate(card)
      .then(function(data){
        console.log(data);
      },
      function(err){console.log(err);});
    };

  };

function disabledCalendar(date, mode) {
  return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
};

})();