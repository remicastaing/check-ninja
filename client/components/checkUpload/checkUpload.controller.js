(function() {
	
    'use strict';

    angular.module('itechApp')
    .controller('checkUploadController', checkUploadController)
    .config(['$compileProvider',
        function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    }]);



    function checkUploadController(x2js, ATA2K, ScheduledMaintenance, Kardex, HCD_Segment, $state) {
    	var vm = this;
    	var check;
    	var kardex;
    	vm.checkReady = false;
        vm.storeReady = false;

    	vm.ata =  ATA2K;

    	vm.loadCheck= function($fileContent){
            check = x2js.xml_str2json(utf8.decode($fileContent));

            vm.description = ScheduledMaintenance.description(check);

            var checkgrid = {};

            checkgrid.data = _.map(check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.ScheduledMaintenanceDetails, function(MaintenanceItem){  
                return HCD_Segment.methods.overview.apply(MaintenanceItem.MaintenanceItem.HCD_Segment);
            })
            
            vm.checkgrid = checkgrid;

            vm.checkReady = true;

    	};

    	vm.loadKardex= function($fileContent){
            kardex = x2js.xml_str2json($fileContent);

            vm.kardex = kardex;
            var AIN = kardex.Kardex.AircraftInformation.AID_Segment.AIN;

            if (_.isEqual(check.ScheduledMaintenance.HDR_Segment, kardex.Kardex.HDR_Segment) && _.isEqual(check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment, kardex.Kardex.AircraftInformation.AID_Segment)) {
            	var partlist= Kardex.partList(kardex.Kardex.AircraftInformation.InstallDetails.InstalledPart,AIN);
            	vm.gridOptions = {
    	        	data : partlist,
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
    
            kardex.WPI = check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.WPI;

            ScheduledMaintenance.create(check)
            .then(function(){
                return Kardex.create(kardex);
            }, function(err){console.log(err);})
            .then(function() {
              return $state.go('checks'); 
            }, function(err){console.log(err);});
        };


    }



})();
