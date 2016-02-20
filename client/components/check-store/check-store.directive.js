(function() {

    'use strict';

    angular.module('itechApp')
    		.directive('checkStore', checkStoreDirective);

    function checkStoreDirective() {
        return {
            templateUrl: 'components/check-store/check-store.html',
            restrict: 'EA',
            controller: 'CheckStoreCtrl',
            controllerAs: 'checkStore',
        };
    }

})();