'use strict';
(function(){

  function Installation(Reference, IPT_Segment, InstalledPart) {
    var ctrl = this;

    console.log(this);

    var installation = ctrl.installation;


    Reference.findInter(installation.MMPN, installation.MMFR, ctrl.amc)
    .then(function(inter){
      if (!inter) {
        
        inter = [{
          MPN : installation.MMPN,
          MFR : installation.MMFR,
          PDT : installation.MPDT,
          ATT_Segment : Reference.initATT_Segment
        }]
      }
      ctrl.inter = inter;

      if (inter.length===1) {
        ctrl.selected = inter[0];
        installation.MPN = ctrl.selected.MPN;
        installation.MFR = ctrl.selected.MFR;
        installation.PDT = ctrl.selected.PDT;
      }
      
      if (installation.MPN) {
        ctrl.selected = _.find(inter, { 'MPN': installation.MPN , 'MFR': installation.MFR  });
      }

      if (!installation.ATT_Segment) {
        installation.ATT_Segment = ctrl.selected.initATT_Segment();
      }

      if (!installation.ATN_Segment && ctrl.selected.initATN_Segment().length>0) {
        ictrl.installation.ATN_Segment = ctrl.selected.initATN_Segment();
      }

    }, function(err){console.log(err);});
    
    ctrl.initInstallation = function(){
      installation.MPN = ctrl.selected.MPN;
      installation.MFR = ctrl.selected.MFR;
      installation.PDT = ctrl.selected.PDT;
      installation.ATT_Segment = ctrl.selected.initATT_Segment();

      if (ctrl.selected.initATN_Segment().length>0) {
        ctrl.installation.ATN_Segment = ctrl.selected.initATN_Segment();
      } else {
        delete ctrl.installation.ATN_Segment;
      };
    }
  };


  angular.module('itechApp')
  .component('installation', {
    templateUrl: 'components/movement/installation/installation.html',
    controller: Installation,
    bindings: {
      installation: '=',
      amc : "="
    }
  });

})();
