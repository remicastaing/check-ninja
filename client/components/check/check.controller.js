(function() {
	'use strict';

	angular
	.module('itechApp')
	.controller('CheckController', CheckController);

	var WPI;  
	function CheckController($scope, checkStoreService, checkhelper, $state)  {
		var vm = this;

		vm.description = checkhelper.description;
		

		vm.editable = {};
		vm.gridOptions = {};
		WPI = $scope.WPI;

		vm.popup2 = {
	    opened: false
	  };
		vm.open2 = function() {
	    vm.popup2.opened = true;
	  };

	  vm.maxDate = new Date(2020, 5, 22);
	  vm.minDate = null;

	  vm.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  vm.disabled = function(date, mode) {
	    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	  };

	  vm.editRow = function (grid, row) {
		    $state.go('item', {WPI:row.entity.WPI, type: row.entity.type, index : row.entity.index });
		}

		checkStoreService.getCheck(WPI).then(function(check){

			vm.header = {
				WPI : WPI,
				WHO : check.ScheduledMaintenance.HDR_Segment.WHO,
				AIN : check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment.AIN,
				REG : check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment.REG,
				WOD : check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment.WOD,
			}; 
			vm.editable.WOD = true;

			var MaintenanceItems = checkhelper.MaintenanceItems(check, true);


			vm.gridOptions = {
	      data : MaintenanceItems,
	      enableSorting: true,
	      enableFiltering: true,
	      showTreeExpandNoChildren: true,
	      columnDefs: [
	      { field: 'index', displayName: '#', enableHiding: false, maxWidth: 30 },
	      { field: 'ATA', displayName: 'ATA', enableHiding: false, maxWidth: 60 },
	      { field: 'MII / OII', displayName: 'MII / OII', enableHiding: false },
	      { field: 'MTD / OTD', displayName: 'MTD / OTD', enableHiding: false },
	      { field: 'TED', displayName: 'TED', enableHiding: false, maxWidth: 100  },
	      { field: 'MIR', displayName: 'MIR', enableHiding: false, cellClass: 'grid-align', cellTemplate: '<div class="center ui-grid-cell-contents"><span class=" glyphicon glyphicon-wrench" ng-if="row.entity[col.field]"></span></div>', maxWidth: 50 },
	      { field: 'REM', displayName: 'REM', enableHiding: false },
	      { field: 'edit', displayName: '  ', cellTemplate: 'components/check/buttons.html',enableSorting: false, enableCellEdit: false, enableFiltering: false, enableColumnMenu: false, maxWidth: 40 },
	      ]
	    };

		}

		);

	};

})();