'use strict';

angular.module('itechApp')
.factory('IPT_Segment', function (store, ATA2K, InstalledPart) {
  return store.defineResource({
    name: 'IPT_Segment',
    idAttribute : 'position', 
    relations: {
      belongsTo: {
        HCD_Segment: {
            // localField is for linking relations
            // user.profile -> profile of the user
            localField: 'HCD_Segment',
            // foreignKey is the "join" field
            // the name of the field on a profile that points to its parent user
            localKey: 'HRI'
          },
        ScheduledMaintenance: {
            // localField is for linking relations
            // user.profile -> profile of the user
            localField: 'ScheduledMaintenance',
            // foreignKey is the "join" field
            // the name of the field on a profile that points to its parent user
            localKey: 'WPI'
          }
        }
      },
      methods : {
        toJson: function(){
          var json = ATA2K.toJson('IPT_Segment', this);

          var ipt = this;

          json.IAT_Segment = _.cloneDeep(this.IAT_Segment);


          _.remove(json.IAT_Segment, function(iat) {
            return (iat.OTT=== null) && (iat.OPC=== null) && (iat.ODT=== null);
          });

          console.log(json);
          _.forEach(json.IAT_Segment, function(iat){
              if (iat.OTT=== null) delete iat.OTT;
              if (iat.OPC=== null) delete iat.OPC;
              if (iat.ODT=== null) {
                delete iat.ODT;
              } else {
                iat.ODT = ATA2K.dateDiff(ipt.DOI, iat.ODT);
              }          
          })
          if (this.ATN_Segment) json.ATN_Segment = this.ATN_Segment;

          _.remove(json.ATN_Segment, function(atn){
            return atn.OTN === null;
          });
          console.log(json);
          return json;
        },
      },
      beforeCreate : beforeCreateIPTSegment,
      beforeUpdate : beforeUpdate
    }
    );

    function beforeUpdate(Resource, ipt, cb){
      ipt.WPI = ipt.HRI.split('/')[0];
      ipt.DOI = ATA2K.convertDate(ipt.DOI);
      _.forEach(ipt.IAT_Segment, function(att){
        att.ODT = ATA2K.convertDate(att.ODT);
      });

      cb(null, ipt);
    }
}).run(function (IPT_Segment) {})

function beforeCreateIPTSegment(Resource, ipt, cb){
  ipt.WPI = ipt.HRI.split('/')[0];

  cb(null, ipt);
}



