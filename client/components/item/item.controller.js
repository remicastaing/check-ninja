(function() {
  'use strict';

  angular
    .module('itechApp')
    .controller('ItemController', ItemController);

  function ItemController( checkStoreService)  {
    var vm = this;
		var index = vm.index;
    var WPI = vm.WPI;

    checkStoreService.getItem(WPI, index ).then(function(item){
      
      vm.item = item;

    });

    
    };	



})();