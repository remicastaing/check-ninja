'use strict';
(function(){

function InstallationsList() {
  var ctrl = this;

    var installationTemplate =  '<div class="ui-grid-cell-contents" style="text-align:center;" >'+
      '<span class="fa-stack"  ng-click="grid.appScope.$ctrl.onEditInstallation({installation : row.entity})"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-arrow-up fa-stack-1x"></i></span>'+
      '</div>';

	ctrl.gridoption = {
      data : '$ctrl.installations',
      enableSorting: true,
      enableFiltering: true,
      showTreeExpandNoChildren: true,
      columnDefs: [
      { field: 'CPI', name: 'ATA', width: '10%' },
      { field: 'MPN', name: 'PN', displayName: 'PNR', width: '15%' },
      { field: 'MFR', name: 'MFR', displayName: 'MFR', width: '10%' },
      { field: 'SER', name: 'SER', displayName: 'SER', width: '15%' },
      { field: 'PDT', name: 'PDT', displayName: 'Descrip.', width: '25%' },
			{ field: 'DOI', name: 'DOI', displayName: 'Date', width: '15%' },
      { field: 'POS', name: 'POS', displayName: '  ', enableHiding: false, enableSorting: false , enableFiltering: false  , enableColumnMenu: false, width: '10%', minWidth : '20', cellTemplate : installationTemplate },
      ]
    };

   ctrl.getTableHeight = function() {
       var rowHeight = 30; // your row height
       var headerHeight = 60; // your header height
       return {
          height: (ctrl.installations.length * rowHeight + headerHeight) + "px"
       };
    };

}



angular.module('itechApp')
  .component('installationsList', {
    templateUrl: 'components/movement/installations-list/installations-list.html',
    controller: InstallationsList,
    bindings: {
	    installations: '<',
	    onEditInstallation : '&'
	  }
  });

})();
