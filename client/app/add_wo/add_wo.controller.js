'use strict';

angular.module('itechApp')
  .controller('AddWoCtrl', function ($stateParams) {
    var vm = this;

    vm.WPI = $stateParams.WPI;
    vm.TWI = $stateParams.TWI;
  });
