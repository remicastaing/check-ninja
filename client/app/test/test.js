'use strict';

angular.module('itechApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        template: '<test></test>'
      });
  });
