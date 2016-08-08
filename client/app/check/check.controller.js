'use strict';

angular.module('itechApp')
  .controller('CheckRouteCtrl', function ($stateParams, ScheduledMaintenance) {
    var vm = this;

    ScheduledMaintenance.find($stateParams.WPI)
			.then(ScheduledMaintenance.loadRelations)
			.then(function(data){
				vm.data = data;
				vm.data.AMC = $stateParams.AMC;
				vm.data.AIN = $stateParams.AIN;
			});


  });
