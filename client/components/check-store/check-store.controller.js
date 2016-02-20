'use strict';

angular.module('itechApp')
.controller('CheckStoreCtrl', function (checkStoreService, $uibModal, $state) {
    var vm = this;

    vm.editRow = editRow;
    vm.exportRow = exportRow;
    vm.deleteRow = deleteRow;

    vm.gridOptions = {
      data : checkStoreService.getOverview(),
      enableSorting: true,
      enableFiltering: true,
      showTreeExpandNoChildren: true,
      columnDefs: [
      { field: 'WPI', name: 'WPI', enableHiding: false, width: '30%' },
      { field: 'items', name: 'items', enableHiding: false, enableSorting: true, enableFiltering: false, enableColumnMenu: false , width: '10%',  },
      { field: 'executedItems', name: 'Réalisés', enableHiding: false, enableSorting : true, enableFiltering: false, enableColumnMenu: false , width: '10%' },
      { field: 'edit', name: '  ', cellTemplate: 'components/check-store/buttons.html',enableSorting: false, enableCellEdit: false, enableFiltering: false, enableColumnMenu: false },
      ]
    };

function editRow(grid, row) {
    $state.go('check', {WPI:row.entity.WPI});
}

function exportRow(grid, row) {
    console.log('delete');
}

function deleteRow(grid, row) {
    $uibModal.open({
      templateUrl: 'components/check-store/delete-modal.html',
      controller: 'DeleteModalInstanceCtrl',
      controllerAs: 'delete',
      resolve: {
        grid: function () { return grid; },
        row: function () { return row; }
    }
});
}

/*    console.log(checkStoreService.getList());
    checkStoreService.getList().then(function(result){
    	_(result).forEach(function(WPI) {
    		vm.gridOptions.data.push({WPI : WPI});
    	});
});*/
})
.controller('DeleteModalInstanceCtrl', function ($uibModalInstance, checkStoreService, grid, row) {

    var vm = this;
    console.log(row);
    console.log(grid);
    //vm.grid = grid;
    vm.WPI = row.entity.WPI;

    vm.delete = function () {
        checkStoreService.deleteCheck(vm.WPI);
                    row.grid.api.core.setRowInvisible(row);
            $uibModalInstance.close();
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});;
