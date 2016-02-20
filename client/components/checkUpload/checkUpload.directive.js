(function() {

    'use strict';

    angular.module('itechApp')
    		.directive('checkUpload', checkUploadDirective);

    function checkUploadDirective() {
        return {
            templateUrl: 'components/checkUpload/checkUpload.html',
            restrict: 'EA',
            controller: 'checkUploadController',
            controllerAs: 'uploadedcheck',
        };
    }

})();