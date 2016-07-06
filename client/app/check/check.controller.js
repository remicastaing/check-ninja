'use strict';

angular.module('itechApp')
  .controller('CheckRouteCtrl', function ($stateParams, ScheduledMaintenance) {
    var vm = this;

    vm.data = ScheduledMaintenance.find($stateParams.WPI)
			.then(ScheduledMaintenance.loadRelations);


  });
