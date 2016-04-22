(function() {
	
    'use strict';

    angular.module('itechApp')
    .controller('checkUploadController', checkUploadController)
    .config(['$compileProvider',
        function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    }]);



    function checkUploadController(x2js, ataspechelper, checkhelper, kardexhelper, checkStoreService) {
    	var vm = this;
    	var check;
    	var kardex;
    	vm.checkReady = false;
        vm.storeReady = false;

    	vm.ata =  ataspechelper;

        vm.checkhelper = checkhelper;

    	vm.loadCheck= function($fileContent){
            check = x2js.xml_str2json($fileContent);

            vm.check = check

            vm.checkReady = true;
    	};

    	vm.loadKardex= function($fileContent){
            var kardex = x2js.xml_str2json($fileContent);

            if (_.isEqual(check.ScheduledMaintenance.HDR_Segment, kardex.Kardex.HDR_Segment) && _.isEqual(check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment, kardex.Kardex.AircraftInformation.AID_Segment)) {
            	vm.check.InstalledPart = kardexhelper.partList(kardex.Kardex.AircraftInformation.InstallDetails.InstalledPart);
            	vm.gridOptions = {
    	        	data : vm.check.InstalledPart,
    	        	enableSorting: true,
    			    enableFiltering: true,
    			    showTreeExpandNoChildren: true,
    			    columnDefs: [
    			      { field: 'CPI', name: 'ATA', width: '10%' },
    			      { field: 'PDT', name: 'Description', width: '40%' },
    			      { field: 'MPN', name: 'P/N', width: '25%' },
    			      { field: 'SER', name: 'S/N', width: '25%' }
    			    ]
            	};
                vm.uncorrelated = false;
                vm.xml = checkhelper.exportAsXml(vm.check);
                var blob = new Blob([ vm.xml ], { type : 'text/xml' });
                vm.exportFile = 'retour_'+ vm.check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.WPI + '.xml';
                vm.exportUrl = (window.URL || window.webkitURL).createObjectURL( blob );
                vm.storeReady = true;
            } else{
            	vm.uncorrelated = true;

            	console.log(DeepDiff.diff(check.ScheduledMaintenance.HDR_Segment, kardex.Kardex.HDR_Segment));
            	console.log(DeepDiff.diff(check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment, kardex.Kardex.AircraftInformation.AID_Segment));
            };
        
    	};

    	vm.closeAlert = function() {
		    vm.uncorrelated = false;
		    console.log('test');
		  };

        vm.save = function() {
            console.log('storing');
            checkStoreService.save(check);
        };


    }



})();