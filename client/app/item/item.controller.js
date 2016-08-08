 'use strict';

angular.module('itechApp')
  .controller('ItemRouteCtrl', function (HCD_Segment, AWR_Segment, NRF_Segment, $stateParams, AID_Segment, IPT_Segment, PAR_Segment) {
    var vm = this;

    vm.AIN = $stateParams.AIN;
    vm.AMC = $stateParams.AMC;
    var WPI = $stateParams.WPI;
    var HRI = [$stateParams.WPI, $stateParams.type, $stateParams.index].join("/");

    vm.HRI = HRI;
    vm.WPI = WPI;
    vm.itemType = $stateParams.type;

    if (vm.itemType===4) {

    } else {}

    vm.selectedfinding = null;

    vm.back = {
      to: 'check',
      param: {AMC:$stateParams.AMC, AIN:$stateParams.AIN, WPI:$stateParams.WPI}
    };
    vm.findingModel = NRF_Segment;
    vm.removalModel = PAR_Segment;
    vm.installationModel = IPT_Segment;
    
    HCD_Segment.find(HRI)
    .then(HCD_Segment.loadRelations)
    .then(function(item){
    	vm.item = item;
      vm.PAR_Segments = item.PAR_Segments;
      vm.IPT_Segments = item.IPT_Segments;
      vm.title = (vm.itemType===4 ? 'Word Order ' : 'Card ')+ item.HRI;
    });

    vm.tab = 'tab';

    vm.select = function(tab){
      vm.tab = tab;
    }


    
    
    vm.editFinding = function(finding){
      vm.selectedfinding = finding;
    }

  });
