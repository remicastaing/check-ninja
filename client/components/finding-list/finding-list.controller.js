'use strict';

angular.module('itechApp')
  .controller('FindingListController', FindingListController)





  function FindingListController($scope) {
    var vm = this;

    var card;
  

  	vm.data = [];
    if (typeof $scope.data.then === 'function'){
      $scope.data.then(function(data){
        card = data;
        vm.data = card;
      }, function(err){console.log(err)})
    } else {
      card = $scope.data;
      vm.card = card;
    }


  var rowTemplate = '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader  }" ui-grid-cell="" ng-click="grid.appScope.findinglist.selectRow(grid, row)" class="ui-grid-cell"></div>';

  vm.gridOptions = {
    data : 'findinglist.data.NRF_Segments',
    rowHeight : 30,
    enableSorting: true,
    enableFiltering: true,
    showTreeExpandNoChildren: true,
    enableFullRowSelection: true,
    enableRowSelection: true,
    rowTemplate: rowTemplate,
    columnDefs: [
    { field: 'FDT', name: 'FDT', displayName: 'Finding Defect', enableHiding: false, enableSorting: true,  enableColumnMenu: false ,  },
    { field: 'MNT', name: 'MNT', displayName: 'Corrrective Action',enableHiding: false, enableSorting: true,  enableColumnMenu: false ,  },
    { field: 'REM', name: 'REM', displayName: 'Remarks',enableHiding: false, enableSorting: true,  enableColumnMenu: false ,  },
    ]
  };

  	vm.getTableHeight = function() {
       var rowHeight = 30; // your row height
       var headerHeight = 60; // your header height
       return {
          height: (vm.data.NRF_Segments.length * rowHeight + headerHeight) + "px"
       };
    };

    vm.data = $scope.data;

    vm.create = function(){
    	console.log('create finding');
    	vm.selectedfinding = {HRI : card.HRI};
    };
    
    vm.selectRow = function(grid, row){
    	console.log(row.entity);
    	vm.selectedfinding ={
    		HRI: row.entity.HRI,
    		FDT: row.entity.FDT,
    		MNT: row.entity.MNT,
    		RMK: row.entity.RMK,
    		id : row.entity.id
    	}
    }
  };
