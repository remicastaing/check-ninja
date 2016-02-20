'use strict';

angular.module('itechApp')
  .controller('CheckRouteCtrl', function ($stateParams) {
    var vm = this;

    vm.WPI = $stateParams.WPI;


  });
