(function() {

    'use strict';

    angular.module('itechApp')
    		.directive('check', checkDirective);

    function checkDirective() {
        return {
            templateUrl: 'components/check/check.html',
            restrict: 'EA',
            scope: {
				      WPI: '=wpi'
				    },
            controller: 'CheckController',
            controllerAs: 'editcheck',
        };
    }

})();