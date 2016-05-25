'use strict';

angular.module('itechApp')
.controller('StoreRouteCtrl', function ($scope, Check, ScheduledMaintenance,HDR_Segment, AID_Segment, WPI_Segment, HCD_Segment, Kardex, InstalledPart) {
	$scope.message = 'Hello';

	$scope.deleteChecks = function(){

		ScheduledMaintenance.destroyAll();

		HDR_Segment.destroyAll();
		 AID_Segment.destroyAll();
		 WPI_Segment.destroyAll();
		 HCD_Segment.destroyAll();
		 Kardex.destroyAll();
		 InstalledPart.destroyAll();

			
		};



});
