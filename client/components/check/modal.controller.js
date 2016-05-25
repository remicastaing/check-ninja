
(function() {
	'use strict';

	angular
	.module('itechApp')
	.controller('DeleteCheckModalInstanceCtrl', deleteCheckModalInstanceCtrl)
	.controller('ExportCheckModalInstanceCtrl', exportCheckModalInstanceCtrl)
	;

	function deleteCheckModalInstanceCtrl($uibModalInstance, WPI, ScheduledMaintenance, $state) {

		var vm = this;

    vm.WPI = WPI;

    vm.delete = function () {
    	ScheduledMaintenance
    	.destroy(WPI).then(function(data){
    		$uibModalInstance.close();
    		$state.go('checks'); 
    	}, function(err){ console.log('delete: '); return console.log(err);})
    };

    vm.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
    };
  }

  function exportCheckModalInstanceCtrl($uibModalInstance, check, ScheduledMaintenance) {

  	var vm = this;

    vm.WPI = check.WPI;

    var xml = check.exportAsXml();
    var blob = new Blob([ xml ], { type : 'text/xml' });
    vm.exportFile = 'retour_'+ check.WPI + '.xml';
    vm.exportUrl = (window.URL || window.webkitURL).createObjectURL( blob );

    vm.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
    };

    vm.close = function () {
        $uibModalInstance.close('close');
    };
  }

})();