'use strict';

angular.module('itechApp')
.factory('NRF_Segment', function (store, ATA2K) {
  return store.defineResource({
    name: 'NRF_Segment',
    //idAttribute : 'key', 
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
          var json = {
            NSI : Math.round(Math.random()*1000000),
            MNT : 'Correctiv Action',
            TSI : true,
            COL : 1,
            COV : 'N',
            COT : 'D',
            CBO : 'D',
            NCP : 'D',
            APF : 'TS',
            AWR_Segment : ATA2K.toJson('AWR_Segment', this),
            NFD : this.NFD
          };
          console.log(json);
          return json;

        }
      },
      beforeCreate : beforeCreateNRFSegment,
      beforeUpdate : function (Resource, data, cb){
          data.NFD = convertDate(data.NFD);
          cb(null, data);
        },
    }
    );
}).run(function (NRF_Segment) {})

function beforeCreateNRFSegment(Resource, nrf, cb){
  console.log(nrf);
  nrf.WPI = nrf.HRI.split('/')[0];
  cb(null, nrf);
};

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

