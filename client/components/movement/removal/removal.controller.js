'use strict';
(function(){

function Removal(PAR_Segment, $state, InstalledPart) {
  var ctrl = this;

  var removal = this.removal;

  console.log(ctrl);

  this.save = function(){

    console.log(removal);
    PAR_Segment.create(removal)
    .then(function(){
      ctrl.removal = null;
    }, function(err){console.log(err)});
  }

  this.close = function(){
    ctrl.removal = null;
  }


}



angular.module('itechApp')
  .component('removal', {
    templateUrl: 'components/movement/removal/removal.html',
    controller: Removal,
    bindings: {
	    removal: '='
	  }
  });

})();
