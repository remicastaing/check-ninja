'use strict';

angular.module('itechApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('finding', {
        url: '/check/:WPI/:type/:item/:NSI',
        templateUrl: 'app/finding/finding.html',
        controller: 'FindingRouteCtrl',
        controllerAs: 'finding'
      });
  });
