'use strict';

angular.module('itechApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('transaction', {
        url: '/transaction/:WPI/:type/:index?AIN&CPI@transaction',
        template: '<transaction></transaction>'
      });
  });
