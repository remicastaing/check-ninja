(function() {

    'use strict';

    angular.module('itechApp')
    		.directive('card', cardDirective);

    function cardDirective() {
        return {
            templateUrl: 'components/card/card.html',
            restrict: 'EA',
            scope: {
                data: '=data'
            },
            controller: 'CardController',
            controllerAs: 'editcard',
        };
    }

})();