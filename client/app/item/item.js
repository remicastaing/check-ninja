'use strict';

angular.module('itechApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('item', {
        url: '/check/:WPI/:type/:index',
        templateUrl: 'app/item/item.html',
        controller: 'ItemRouteCtrl',
        controllerAs: 'item'
      });
  });
