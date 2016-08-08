'use strict';

(function(){

function FindingList() {
  var ctrl = this;

  var rowTemplate = '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader  }" ui-grid-cell="" ng-click="grid.appScope.$ctrl.selectRow(grid, row)" class="ui-grid-cell"></div>';

  ctrl.gridOptions = {
    data : '$ctrl.data.NRF_Segments',
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
    { field: 'NFD', name: 'NFD', displayName: 'Date',enableHiding: false, enableSorting: true,  enableColumnMenu: false ,  cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center;">{{row.entity.NFD | date : "yyyy-MM-dd"}}</div>'},
    ]
  };

    ctrl.getTableHeight = function() {
       var rowHeight = 30; // your row height
       var headerHeight = 60; // your header height
       return {
          height: (ctrl.data.NRF_Segments.length * rowHeight + headerHeight) + "px"
       };
    };
    
    ctrl.selectRow = function(grid, row){
      ctrl.onEditFinding({finding: {
        HRI: row.entity.HRI,
        FDT: row.entity.FDT,
        MNT: row.entity.MNT,
        REM: row.entity.REM,
        WPI : row.entity.WPI,
        NFD : row.entity.NFD,
        id : row.entity.id
      }});
    }


}

angular.module('itechApp')
  .component('findingList', {
    templateUrl: 'components/findings/finding-list/finding-list.html',
    controller: FindingList,
    bindings: {
      data: '=',
      onEditFinding : "&?"
    }
  });

})();