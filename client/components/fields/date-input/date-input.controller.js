'use strict';
(function(){

function DateInput() {
  var vm = this;


  vm.opened = false;

    vm.open = function () {
      console.log('open');
      vm.opened = true;
    };

    vm.maxDate = new Date(2020, 5, 22);
    vm.minDate = null;

    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    vm.disabled = disabledCalendar;
}

function disabledCalendar(date, mode) {
  return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
};

angular.module('itechApp')
  .component('dateInput', {
    templateUrl: 'components/fields/date-input/date-input.html',
    controller: DateInput,
    bindings: {
      date: '='
    }
  });

})();
