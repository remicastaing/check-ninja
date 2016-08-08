'use strict';

angular.module('itechApp')
.factory('PAR_Segment', function (store, ATA2K, InstalledPart) {
  return store.defineResource({
    name: 'PAR_Segment',
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
        },
        hasOne: {
          InstalledPart: {
            localKey: 'position',
            localField: 'InstalledPart'
          }
        }
      },
      methods : {
        toJson: function(){
          var json = ATA2K.toJson('PAR_Segment', this);
          json.ATT_Segment = this.ATT_Segment;
          if (this.ATN_Segment) json.ATN_Segment = this.ATN_Segment;
          return json;
        },
        isDeletable : function () {
          var isDeletable = this.InstalledPart.IPT_Segment ? false : true;

          

          function checkLowerPart(part){
            _.forEach(part.lowerPart, function(lowerPart){
              isDeletable = isDeletable && (lowerPart.IPT_Segment ? false : true) && checkLowerPart(lowerPart);
            })
            return isDeletable;
          }

          isDeletable = isDeletable && checkLowerPart(this.InstalledPart);

          return isDeletable;
        }
      },
      beforeCreate : beforeCreatePARSegment,
      beforeUpdate : beforeCreatePARSegment
    }
    );

  function beforeCreatePARSegment(Resource, par, cb){
    par.WPI = par.HRI.split('/')[0];
    par.RED = convertDate(par.RED); 
    _.forEach(par.ATT_Segment, function(att){
      att.ODT = convertDate(att.ODT);
    })
    cb(null, par);
    };


  }).run(function (PAR_Segment) {});




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
  };