'use strict';
(function(){

function SelectPosition(Kardex, $state) {
  var ctrl = this;

  ctrl.editRemoval = function(position){
    console.log(position);
    ctrl.onEditRemoval({position: position});
  }

  var removalTemplate =  '<div class="ui-grid-cell-contents" style="text-align:center;">'+
    '<removal-button part = "row.entity" on-edit = "grid.appScope.$ctrl.editRemoval(position)"></removal-button>'+
    '</div>'


  ctrl.editInstallation = function(position){
    console.log(position);
    ctrl.onEditInstallation({position: position});
  }

  var installationTemplate =  '<div class="ui-grid-cell-contents" style="text-align:center;">'+
  '<installation-button part = "row.entity" on-edit = "grid.appScope.$ctrl.editInstallation(position)"></installation-button>'+
  '</div>';

  var CPITemplate = '<div class="ui-grid-cell-contents" ng-class = "{higher : row.entity.lowerPart.length}">'+
  '{{grid.appScope.$ctrl.nbSpaces(row.entity.$$treeLevel)}}{{row.entity.CPI}}'+
  '</div>';



  function genTemplate(col){
    return '<div class="ui-grid-cell-contents" ng-class = "{higher : row.entity.lowerPart.length}">'+
  '{{row.entity.'+col+'}}'+
  '</div>';
  }

  ctrl.nbSpaces = function(nb){
    var res = "";
    for (var i = nb; i > 0; i--) {
      res = res + "-";
    }
    return res + " ";
  }


  ctrl.partsgrid = {
  	data : '$ctrl.parts',
  	enableSorting: true,
	  enableFiltering: true,
	  showTreeExpandNoChildren: false,
    treeRowHeaderAlwaysVisible: false,
    excessRows : 100,
	  columnDefs: [
	    { field: 'CPI', name: 'ATA', width: '7%', cellTemplate : CPITemplate, cellClass : 'normal'},
	    { field: 'PDT', name: 'Description', width: '36%', cellTemplate : genTemplate('PDT'), cellClass : 'normal'},
	    { field: 'MPN', name: 'P/N', width: '23%', cellTemplate : genTemplate('MPN'), cellClass : 'normal'},
	    { field: 'SER', name: 'S/N', width: '21%', cellTemplate : genTemplate('SER'), cellClass : 'normal'},
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
