'use strict';

angular.module('itechApp')
  .controller('FindingRouteCtrl', function ($stateParams) {
    var vm = this;

    vm.WPI = $stateParams.WPI;
    vm.type = $stateParams.type;
    vm.item = $stateParams.item;
    vm.NSI = $stateParams.NSI;
  });
