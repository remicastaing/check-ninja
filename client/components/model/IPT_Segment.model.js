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
          console.log(this);
          var json = ATA2K.toJson('PAR_Segment', this);
          json.ATT_Segment = this.ATT_Segment;
          if (this.ATN_Segment) json.ATN_Segment = this.ATN_Segment;
          return json;
        },
      },
      beforeCreate : beforeCreateIPTSegment,
      beforeUpdate : beforeUpdate
    }
    );
}).run(function (IPT_Segment) {})

function beforeCreateIPTSegment(Resource, ipt, cb){
  ipt.WPI = ipt.HRI.split('/')[0];

  cb(null, ipt);
}

function beforeUpdate(Resource, ipt, cb){
  ipt.WPI = ipt.HRI.split('/')[0];
  _.forEach(ipt.ATT_Segment, function(att){
    att.ODT = convertDate(att.ODT);
  });

  cb(null, ipt);
}

  function convertDate(date) {
    switch (typeof date)
    {
      case "undefined":
        date = null;
        break;
      case "object":
      case "string":
        date = date === '0001-01-01' ? null: Date.parse(date);
        break;
      case "number":
        break;

    };

    return date;
  }