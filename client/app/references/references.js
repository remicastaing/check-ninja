'use strict';

angular.module('itechApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('references', {
        url: '/references',
        template: '<references></references>'
      });
  });
