'use strict';

angular.module('itechApp')
  .controller('ItemRouteCtrl', function ($stateParams) {
    var vm = this;

    vm.WPI = $stateParams.WPI;
    vm.type = $stateParams.type;
    vm.index = $stateParams.index;
  });
