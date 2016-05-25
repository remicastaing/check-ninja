(function() {

'use strict';

angular.module('itechApp')
  .directive('findingList', findingListDirective);

function findingListDirective() {
        return {
            templateUrl: 'components/finding-list/finding-list.html',
            restrict: 'EA',
            scope: {
                data: '=data'
            },
            controller: 'FindingListController',
            controllerAs: 'findinglist',
        };
    }

})();