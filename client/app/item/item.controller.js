'use strict';

angular.module('itechApp')
  .controller('ItemRouteCtrl', function (HCD_Segment, AWR_Segment, NRF_Segment, $stateParams) {
    var vm = this;

    var HRI = [$stateParams.WPI, $stateParams.type, $stateParams.index].join("/");

   	vm.itemType = $stateParams.type;

    vm.data = HCD_Segment.find(HRI).then(HCD_Segment.loadRelations);
    

  });
