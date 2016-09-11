'use strict';
(function(){

  function Installation(Reference, IPT_Segment, InstalledPart, PAR_Segment) {
    var ctrl = this;
    var formerRemoval;

    console.log(this);

    Reference.findInter(ctrl.installation.MMPN, ctrl.installation.MMFR, ctrl.amc)
    .then(function(inter){
      if (!inter) {     
        return InstalledPart.getReference(ctrl.ain, ctrl.installation.CPI);
      } else {
        return inter;
      }
    })
    .then(function(inter){

      ctrl.inter = inter;

      if (inter.length===1) {
        ctrl.selected = inter[0];
        ctrl.installation.MPN = ctrl.selected.MPN;
        ctrl.installation.MFR = ctrl.selected.MFR;
        ctrl.installation.PDT = ctrl.selected.PDT;
      }

      if (ctrl.installation.MPN) {
        ctrl.selected = _.find(inter, { 'MPN': ctrl.installation.MPN , 'MFR': ctrl.installation.MFR  });
  
        if (!ctrl.installation.ATN_Segment && ctrl.selected.initATN_Segment().length>0) {
          ctrl.installation.ATN_Segment = ctrl.selected.initATN_Segment();
        }
      }

      if (!ctrl.installation.IAT_Segment) {
        ctrl.installation.IAT_Segment = Reference.initATT_Segment();
      }

    }, function(err){console.log(err);});

    PAR_Segment.find(ctrl.ain+'/'+ctrl.installation.CPI).then(function(par){ctrl.formerRemoval = par;});
    
    ctrl.initInstallation = function(){
      ctrl.installation.MPN = ctrl.selected.MPN;
      ctrl.installation.MFR = ctrl.selected.MFR;
      ctrl.installation.PDT = ctrl.selected.PDT;
      ctrl.installation.IAT_Segment = ctrl.selected.initATT_Segment();

      if (ctrl.selected.initATN_Segment().length>0) {
        ctrl.installation.ATN_Segment = ctrl.selected.initATN_Segment();
      } else {
        delete ctrl.installation.ATN_Segment;
      };

      console.log(ctrl.installation);
    }

  };


  angular.module('itechApp')
  .component('installation', {
    templateUrl: 'components/movement/installation/installation.html',
    controller: Installation,
    bindings: {
      installation: '=',
      amc : "=",
      ain: "=",
      onEditRemoval : "&?"
    }
  });

})();
