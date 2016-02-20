(function() {

    'use strict';

    angular.module('itechApp')
    		.directive('item', itemDirective);

    function itemDirective() {
        return {
            templateUrl: 'components/item/item.html',
            restrict: 'EA',
            scope: {},
            bindToController: {
                  WPI: '=wpi',
                  index: '=index'
            },
            controller: 'ItemController',
            controllerAs: 'edititem',
        };
    }

})();