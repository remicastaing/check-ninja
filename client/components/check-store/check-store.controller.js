'use strict';

angular.module('itechApp')
.controller('CheckStoreCtrl', function ($state, ScheduledMaintenance) {
  var vm = this;

  vm.editRow = editRow;


  vm.data = [];

  var rowTemplate = '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader  }" ui-grid-cell="" ng-click="grid.appScope.checkStore.editRow(grid, row)" class="ui-grid-cell"></div>';

  vm.gridOptions = {
    data : 'checkStore.data',
    enableSorting: true,
    enableFiltering: true,
    showTreeExpandNoChildren: true,
    enableFullRowSelection: true,
    enableRowSelection: true,
    rowTemplate: rowTemplate,
    columnDefs: [
    { field: 'AMC', name: 'AMC', displayName: 'AMC', enableHiding: false, width: '20%' },
    { field: 'AIN', name: 'AIN', displayName: 'AIN', enableHiding: false, width: '20%' },
    { field: 'WPI', name: 'WPI', displayName: 'WPI', enableHiding: false, width: '20%' },
    { field: 'items', name: 'items', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false , width: '20%',  },
    { field: 'executedItems', name: 'Executed', enableHiding: false, enableSorting : true, enableFiltering: false, enableColumnMenu: false , width: '20%' },
 //   { field: 'edit', name: '  ', cellTemplate: 'components/check-store/buttons.html',enableSorting: false, enableCellEdit: false, enableFiltering: false, enableColumnMenu: false },
    ]
  };


  ScheduledMaintenance.overview().then(function(overviewdata){
    vm.data = overviewdata;
  });

  function editRow(grid, row) {
    $state.go('check', {AMC:row.entity.AMC, AIN:row.entity.AIN, WPI:row.entity.WPI});
  }



});
