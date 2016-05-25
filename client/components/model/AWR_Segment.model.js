'use strict';

angular.module('itechApp')
.factory('AWR_Segment', function (store, ATA2K) {
  return store.defineResource({
    name: 'AWR_Segment',
    idAttribute : 'HRI', 
    relations: {
      belongsTo: {
        ScheduledMaintenance: {
            // localField is for linking relations
            // user.profile -> profile of the user
            localField: 'ScheduledMaintenance',
            // foreignKey is the "join" field
            // the name of the field on a profile that points to its parent user
            localKey: 'WPI'
          }
        },
        hasMany: {
          NRF_Segment: {
            // localField is for linking relations
            // user.comments -> array of comments of the user
            localField: 'NRF_Segments',
            // foreignKey is the "join" field
            // the name of the field on a comment that points to its parent user
            foreignKey: 'HRI'
          }
        }
      },
      methods: {
        overview : awrOverview,
        toJson: function(){


          return {
          	HRI : this.HRI,
          	OST : true,
          	MIR: false,
          	AWR_Segment: ATA2K.toJson('AWR_Segment', this)
          };
        }
      },
      beforeUpdate : function (Resource, data, cb){
        data.TED = convertDate(data.TED);
        cb(null, data);
      }
    }
    );
}).run(function (AWR_Segment) {});



function awrOverview(complete){

  complete = typeof complete !== 'undefined' ? complete : false;


  var HRI = this.HRI.split('/');

  return complete ? {
    'type' : HRI[1],
    'index' : HRI[2],
    'HRI' : this.HRI,
    'ATA': this.ATA,
    'Identifier' : this.TWI,
    'Description' : this.FDT,
    'TED': this.TED,
    'MIR': this.MIR==="true"? true: false,
    'REM': this.REM,
  } :
  {
    'HRI' : this.HRI,
    'ATA': this.ATA,
    'Identifier' : this.OST ? this.OII : this.MII,
    'Description' : this.OST ? this.OTD : this.MTD
  };
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