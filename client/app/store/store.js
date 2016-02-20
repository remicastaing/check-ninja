'use strict';

angular.module('itechApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checks', {
        url: '/checks',
        templateUrl: 'app/store/store.html',
        controller: 'StoreRouteCtrl'
      });
  });
