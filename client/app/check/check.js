'use strict';

angular.module('itechApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('check', {
        url: '/check/:AMC/:AIN/:WPI',
        templateUrl: 'app/check/check.html',
        controller: 'CheckRouteCtrl',
        controllerAs: '$ctrl'
      });
  });
