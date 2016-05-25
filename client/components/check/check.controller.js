(function() {
	'use strict';

	angular
	.module('itechApp')
	.controller('CheckController', CheckController);

	var WPI;

	var check;  

	function CheckController($scope, $state, $uibModal)  {
		var vm = this;
		
		vm.gridOptions = {};
		check = $scope.data;

		WPI = $scope.data.WPI;

		vm.popup = {
			WOE : {opened: false},
			WOD : {opened: false}
		};

		vm.open = function (field) {
			vm.popup[field].opened = true;
		};

		vm.maxDate = new Date(2020, 5, 22);
		vm.minDate = null;

		vm.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		vm.disabled = disabledCalendar;

		vm.editRow = function (grid, row) {
			$state.go('item', {WPI:WPI, type: row.entity.type, index : row.entity.index });
		};

		vm.exportRow = function() {
			$uibModal.open({
				templateUrl: 'components/check/export-modal.html',
				controller: 'ExportCheckModalInstanceCtrl',
				controllerAs: 'export',
				resolve: {
					check: function () { return check;}
				}
			});
		}

		vm.delete = function() {
			$uibModal.open({
				templateUrl: 'components/check/delete-modal.html',
				controller: 'DeleteCheckModalInstanceCtrl',
				controllerAs: 'delete',
				resolve: {
					WPI: function () { return WPI;}
				}
			});
		};

		vm.save = function() {
			check.WPI_Segment.DSUpdate(check.WPI_Segment)
			.then(function(data){
			},
			function(err){console.log(err);});
		};

		vm.HDR_Segment = check.HDR_Segment;
		vm.AID_Segment = check.AID_Segment;
		vm.WPI_Segment = check.WPI_Segment;
		vm.items = check.maintenanceItemOverview(true);



		var edit = ['<div class="ui-grid-cell-contents">',
		'<button type="button" class="btn btn-default btn-xs" ng-click="grid.appScope.editcheck.editRow(grid, row)">',
		'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>',
		'</button>',
		'</div>'].join('');

		var rowTemplate = '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader  }" ui-grid-cell="" ng-click="grid.appScope.editcheck.editRow(grid, row)" class="ui-grid-cell"></div>';

		vm.gridOptions = {
			data :  'editcheck.items',
			enableSorting: true,
			enableFiltering: true,
			enableColumnResizing: true,
			enableFullRowSelection: true,
			enableRowSelection: true,
			rowTemplate: rowTemplate,
			columnDefs: [
				{ field: 'index', name: 'index', displayName: '#', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false , width: 30,  },
				{ field: 'ATA', name: 'ATA', displayName: 'ATA', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false, maxWidth: 80 },
				{ field: 'Identifier', name: 'Identifier', displayName: 'Identifier', enableHiding: false, enableSorting: true, enableFiltering: true, enableColumnMenu: false },
				{ field: 'Description', name: 'MTDDescriptionOTD', displayName: 'Description', enableHiding: false, enableSorting: true, enableFiltering: true, enableColumnMenu: false },
				{ field: 'REM', name: 'REM', displayName: 'REM', enableHiding: false, enableSorting: true, enableFiltering: true, enableColumnMenu: false},
				{ field: 'TED', name: 'TED', displayName: 'TED', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false, width: 80, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center;">{{row.entity.TED | date : "yyyy-MM-dd"}}</div>'},
				{ field: 'MIR', name: 'MIR', displayName: 'MIR', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false, width: 45, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center;"><i class="fa fa-wrench" ng-if="row.entity.MIR" aria-hidden="true"></i></div>'},
			]
};



};



function disabledCalendar(date, mode) {
	return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
};

})();