'use strict';

angular.module('itechApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('add_wo', {
        url: '/check/:WPI/ADDWO/:TWI',
        templateUrl: 'app/add_wo/add_wo.html',
        controller: 'AddWoCtrl',
        controllerAs : 'wo'
      });
  });
