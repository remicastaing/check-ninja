'use strict';

angular.module('itechApp')
  .directive('finding', function () {
    return {
      templateUrl: 'components/finding/finding.html',
      restrict: 'EA',
      scope: {
                data: '=data'
            },
      controller: 'FindingController',
      controllerAs: 'editfinding',
    };
  });
