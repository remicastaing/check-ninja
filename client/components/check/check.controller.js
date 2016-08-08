(function() {
	'use strict';

	function Check($state, $uibModal)  {
		var ctrl = this;

		ctrl.items = ctrl.data.maintenanceItemOverview(true);

		ctrl.editRow = function (grid, row) {
			$state.go('item', {AMC: ctrl.data.AID_Segment.AMC, AIN:ctrl.data.AID_Segment.AIN, WPI: ctrl.data.WPI, type: row.entity.type, index : row.entity.index });
		};

		ctrl.exportRow = function() {
			$uibModal.open({
				templateUrl: 'components/check/export-modal.html',
				controller: 'ExportCheckModalInstanceCtrl',
				controllerAs: 'export',
				resolve: {
					check: function () { return ctrl.data;}
				}
			});
		}

		ctrl.delete = function() {
			$uibModal.open({
				templateUrl: 'components/check/delete-modal.html',
				controller: 'DeleteCheckModalInstanceCtrl',
				controllerAs: 'delete',
				resolve: {
					WPI: function () { return ctrl.data.WPI;}
				}
			});
		};

		ctrl.save = function() {
			ctrl.data.WPI_Segment.DSUpdate(ctrl.data.WPI_Segment)
			.then(function(data){
			},
			function(err){console.log(err);});
		};

		ctrl.getTableHeight = function() {
       var rowHeight = 30; // your row height
       var headerHeight = 60; // your header height
       return {
          height: (ctrl.items.length * rowHeight + headerHeight) + "px"
       };
    };


		var edit = ['<div class="ui-grid-cell-contents">',
		'<button type="button" class="btn btn-default btn-xs" ng-click="grid.appScope.$ctrl.editRow(grid, row)">',
		'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>',
		'</button>',
		'</div>'].join('');

		var type = ['<div class="ui-grid-cell-contents">',
		'<i class="fa fa-calendar-check-o" aria-hidden="true" ng-if="grid.getCellValue(row, col)!=4"></i>',
		'<i class="fa fa-file-word-o" aria-hidden="true" ng-if="grid.getCellValue(row, col)==4"></i>',
		'</div>'].join('');

		var rowTemplate = '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader  }" ui-grid-cell="" ng-click="grid.appScope.$ctrl.editRow(grid, row)" class="ui-grid-cell"></div>';

		ctrl.gridOptions = {
			data :  '$ctrl.items',
			enableSorting: true,
			enableFiltering: true,
			enableColumnResizing: true,
			enableFullRowSelection: true,
			enableRowSelection: true,
			rowTemplate: rowTemplate,
			columnDefs: [
			{ field: 'index', name: 'index', displayName: '#', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false , width: 30,  },
			{ field: 'type', name: 'type', displayName: ' ', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false , width: 30,  cellTemplate: type},
			{ field: 'ATA', name: 'ATA', displayName: 'ATA', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false, maxWidth: 80 },
			{ field: 'Identifier', name: 'Identifier', displayName: 'Identifier', enableHiding: false, enableSorting: true, enableFiltering: true, enableColumnMenu: false },
			{ field: 'Description', name: 'MTDDescriptionOTD', displayName: 'Description', enableHiding: false, enableSorting: true, enableFiltering: true, enableColumnMenu: false },
			{ field: 'REM', name: 'REM', displayName: 'REM', enableHiding: false, enableSorting: true, enableFiltering: true, enableColumnMenu: false},
			{ field: 'TED', name: 'TED', displayName: 'TED', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false, width: 80, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center;">{{row.entity.TED | date : "yyyy-MM-dd"}}</div>'},
			{ field: 'MIR', name: 'MIR', displayName: 'MIR', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false, width: 45, cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center;"><i class="fa fa-wrench" ng-if="row.entity.MIR" aria-hidden="true"></i></div>'},
			]
		};



	};

	angular.module('itechApp')
	.component('check', {
		templateUrl: 'components/check/check.html',
		controller: Check,
		bindings: {
			data: '='
		}
	});

})();