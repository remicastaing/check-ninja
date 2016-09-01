'use strict';
(function(){

  function Movement($state, PAR_Segment, IPT_Segment, InstalledPart) {
    var ctrl = this;

    var movements = {};

    _.map(ctrl.data.PAR_Segments, function(r){
        movements[r.CPI]={
          CPI : r.CPI,
          PNR : r.MPN,
          SERR : r.SER,
          PAR_Segment : r         
        };
      });

    _.map(ctrl.data.IPT_Segments, function(i){
        movements[i.CPI]= _.assign(movements[i.CPI],{
          CPI : i.CPI,
          PNI : i.MPN,
          SERI : i.SER,
          IPT_Segment : i 
        });
      });

    ctrl.movements = _.values(movements);

    console.log(movements);

    var removalTemplate =  '<div class="ui-grid-cell-contents" style="text-align:center;" ng-if="row.entity.PAR_Segment" ng-click="grid.appScope.$ctrl.editRemoval(grid, row)">'+
      '<span class="fa-stack"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-arrow-down fa-stack-1x"></i></span>'+
      '</div>';
    var installationTemplate =  '<div class="ui-grid-cell-contents" style="text-align:center;" >'+
      '<span class="fa-stack" ng-if="row.entity.IPT_Segment" ng-click="grid.appScope.$ctrl.editInstallation(grid, row)"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-arrow-up fa-stack-1x"></i></span>'+
      '<span class="fa-stack" ng-if="!row.entity.IPT_Segment" ng-click="grid.appScope.$ctrl.createInstallation(grid, row)"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-plus fa-stack-1x"></i></span>'+
      '</div>';

    ctrl.editRemoval = function(grid, row){    
      ctrl.removal = row.entity.PAR_Segment;
      ctrl.removal.deletable = ctrl.removal.isDeletable();
    }

    ctrl.editInstallation = function(grid, row){
      ctrl.installation = row.entity.IPT_Segment;
    }

    ctrl.createInstallation = function(grid, row){
      InstalledPart.find(ctrl.ain + '/' + row.entity.CPI).then(function(position){
        ctrl.installation = position.initInstallation(ctrl.hri);
      })
      
    }

    ctrl.movementsgrid = {
      data : '$ctrl.movements',
      enableSorting: true,
      enableFiltering: true,
      showTreeExpandNoChildren: true,
      columnDefs: [
      { field: 'CPI', name: 'ATA', width: '11%' },
      { field: 'DEP', name: 'DEP', displayName: '  ', enableHiding: false, enableSorting: false , enableFiltering: false  , enableColumnMenu: false, width: '5%', minWidth : '20', cellTemplate : removalTemplate },
      { field: 'PNR', name: 'PNR', displayName: 'Removed PNR', width: '19%' },
      { field: 'SERR', name: 'SERR', displayName: 'Removed SER', width: '19%' },
      { field: 'POS', name: 'POS', displayName: '  ', enableHiding: false, enableSorting: false , enableFiltering: false  , enableColumnMenu: false, width: '5%', minWidth : '20', cellTemplate : installationTemplate },
      { field: 'PNI', name: 'PNI', displayName: 'Installed PNR', width: '19%' },
      { field: 'SERI', name: 'SERI', displayName: 'Installed SER', width: '19%' },
      ]
    };

    ctrl.getTableHeight = function() {
       var rowHeight = 30; // your row height
       var headerHeight = 60; // your header height
       return {
          height: (ctrl.movements.length * rowHeight + headerHeight) + "px"
       };
    };

    
  }

  angular.module('itechApp')
  .component('movement', {
    templateUrl: 'components/movement/movement/movement.html',
    controller: Movement,
    bindings: {
     ain: '<',
     hri: '<',
     data : '=',
     removal: '=',
     installation : '='

   }
 });

})();
