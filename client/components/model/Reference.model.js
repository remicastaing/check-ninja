'use strict';

angular.module('itechApp')
.factory('Reference', function (store) {

	var Reference = store.defineResource({
		name: 'Reference',
		methods: {
    // resource-specific instance method
	    initATT_Segment: initATT_Segment,
	    initATN_Segment: function () {
	    	return _([this.NSC1, this.NSC2, this.NSC3]).map(initATN).pull(null).flatten().value();
	    }
	  }
	}
	);

	Reference.initATT_Segment = initATT_Segment;

	Reference.findInter = function(MPN, MFR, AMC){
		var where = {
			MPN: {
				'==': MPN
			},
			'MFR': {
				'==': MFR
			},
			'AMC': {
				'==': AMC
			} 
		};

		var promise  = Reference
		.findAll({where : where})
		.then(function(ref){

			if (ref.length === 0) return null;

			var ref0 = ref[0];

			if (!ref0.MMPN) return ref;
			
			var where = {
				'MMPN': {
					'==': ref0.MMPN
				},
				'MMFR': {
					'==': ref0.MMFR
				},
				'AMC': {
					'==': ref0.AMC
				}  
			};

			return Reference.findAll({where : where});
		}, function(err){console.log(err)});

		return promise;

	}

	return Reference

}).run(function (Reference) {});

function initATN(NSC){
	return NSC? [
	      {	TRF: 'N',	NSC: NSC, OTN: null},
	      {	TRF: 'X',	NSC: NSC, OTN: null},
	      {	TRF: 'Y',	NSC: NSC, OTN: null},
	      {	TRF: 'O',	NSC: NSC, OTN: null},
	      ] : null;
}

function initATT_Segment() {
	      return [
	      {	TRF: 'N',	OTT: null, OPC: null, ODT : null},
	      {	TRF: 'X',	OTT: null, OPC: null, ODT : null},
	      {	TRF: 'Y',	OTT: null, OPC: null, ODT : null},
	      {	TRF: 'O',	OTT: null, OPC: null, ODT : null},
	      ];
	    }

