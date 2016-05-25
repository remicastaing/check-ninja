'use strict';

angular.module('itechApp')
  .controller('CheckRouteCtrl', function ($stateParams, ScheduledMaintenance) {
    var vm = this;

    ScheduledMaintenance.find($stateParams.WPI)
			.then(ScheduledMaintenance.loadRelations)
			.then(
				function(check){	vm.data = check;}, 
				function(err){console.log(err);}
				);


  });
