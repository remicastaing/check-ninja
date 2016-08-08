'use strict';
(function(){

function TransactionComponent($stateParams, Kardex, InstalledPart, PAR_Segment, IPT_Segment) {
  var ctrl = this;
  var HRI = [$stateParams.WPI, $stateParams.type, $stateParams.index].join("/");
  ctrl.HRI = HRI;
  ctrl.remove = null
  ctrl.install = null;
  var AIN = $stateParams.AIN;

  ctrl.editRemoval = function(position){
  	switch (position.status) {
  		case 'original':
  			ctrl.removal = position.initRemoval(HRI);
  			break;
  		case 'removed':
  			PAR_Segment.findAll({where:{'position': { "==" : position.id}}})
  				.then(function(par){
  					ctrl.removal = par[0];
  				})
  			break;
  	}
  }

  ctrl.editInstallation = function(position){
  	console.log(position);
  	switch (position.status) {
  		case 'removed':
  		case 'none':
  			position.initInstallation(HRI)
  			.then(function(data){
  				console.log(data);
  				ctrl.installation = data.installation;
  				ctrl.inter = data.inter;
  			}, function(err){console.log(err);});
  			break;
  		case 'replaced':
  		case 'installed':
  			IPT_Segment.findAll({where:{'position': { "==" : position.id}}})
  				.then(function(par){
  					ctrl.installation = par[0];
  				})
  			break;
  	}
  }

	ctrl.parts = InstalledPart.findAll(
  {
	  where: {
	    'AIN': {
	      '==': AIN
	    }
	  },
	  orderBy: 'index'
	});

	// var where = {
	// 		  where: {
	// 		    'AIN': {
	// 		      '==': AIN
	// 		    },
	// 		    'CPI': {
	// 		      '==': CPI
	// 		    }
	// 		  }
	// 		};



}

angular.module('itechApp')
  .component('transaction', {
    templateUrl: 'app/transaction/transaction.html',
    controller: TransactionComponent
  });

})();
