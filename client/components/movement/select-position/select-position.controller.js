'use strict';
(function(){

function SelectPosition(Kardex, $state) {
  var ctrl = this;

  ctrl.editRemoval = function(position){
    ctrl.onEditRemoval({position: position});
  }

  var removalTemplate =  '<div class="ui-grid-cell-contents" style="text-align:center;">'+
    '<removal-button part = "row.entity" on-edit = "grid.appScope.$ctrl.editRemoval(position)"></removal-button>'+
    '</div>'


  ctrl.editInstallation = function(position){
    ctrl.onEditInstallation({position: position});
  }

  var installationTemplate =  '<div class="ui-grid-cell-contents" style="text-align:center;">'+
  '<installation-button part = "row.entity" on-edit = "grid.appScope.$ctrl.editInstallation(position)"></installation-button>'+
  '</div>';


  ctrl.partsgrid = {
  	data : '$ctrl.parts',
  	enableSorting: true,
	  enableFiltering: true,
	  showTreeExpandNoChildren: true,
	  columnDefs: [
	    { field: 'CPI', name: 'ATA', width: '7%' },
	    { field: 'PDT', name: 'Description', width: '36%' },
	    { field: 'MPN', name: 'P/N', width: '23%' },
	    { field: 'SER', name: 'S/N', width: '21%' },
	    { field: 'DEP', name: 'DEP', displayName: '  ', enableHiding: false, enableSorting: false	, enableFiltering: false	, enableColumnMenu: false, width: '5%', minWidth : '20', cellTemplate : removalTemplate },
	    { field: 'POS', name: 'POS', displayName: '  ', enableHiding: false, enableSorting: false	, enableFiltering: false	, enableColumnMenu: false, width: '5%', minWidth : '20', cellTemplate : installationTemplate },
	  ]
	};

}

angular.module('itechApp')
  .component('selectPosition', {
    template: '<div ui-grid="$ctrl.partsgrid" ui-grid-tree-view class="myGrid"></div>',
    controller: SelectPosition,
    bindings: {
	    parts: '<',
      onEditRemoval: '&?',
      onEditInstallation: '&?',
	  }
  });

})();
