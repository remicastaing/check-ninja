(function() {

    'use strict';

    angular.module('itechApp')
    		.directive('workOrder', workOrderDirective);
            

    function workOrderDirective() {
        return {
            templateUrl: 'components/work-order/work-order.html',
            restrict: 'EA',
            scope: {
                data: '=data'
            },
            controller: 'WorkOrderController',
            controllerAs: 'editwo',
        };
    }

})();