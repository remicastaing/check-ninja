'use strict';

angular.module('itechApp')
.controller('StoreRouteCtrl', function ($scope, Check) {
	$scope.message = 'Hello';

	$scope.deleteChecks = function(){
		Check.destroyAll().then(function(){
			Check.findAll().then(function (checks) {
				console.log(checks);
			});
			
		});



	};


});
