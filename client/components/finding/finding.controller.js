'use strict';

angular.module('itechApp')
  .controller('FindingController', FindingController);



  function FindingController ($scope, NRF_Segment) {
    var vm = this;

    vm.finding = $scope.data;

    vm.close = function(){
    	delete $scope.data;
    };

    vm.save = function(){
    	NRF_Segment.create(vm.finding);
    }

    vm.delete = function(){
    	NRF_Segment.destroy(vm.finding.id).then(function(){
    		delete $scope.data;
    	});
    }

  };
