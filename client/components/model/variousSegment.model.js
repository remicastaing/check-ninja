'use strict';

angular.module('itechApp')
.factory('HDR_Segment', function (store, ATA2K) {
  return store.defineResource({
    name: 'HDR_Segment',
    //idAttribute : 'key', 
    //beforeUpdate: beforeUpdateWPI,
    relations: {
      belongsTo: {
        ScheduledMaintenance: {
            // localField is for linking relations
            // user.profile -> profile of the user
            localField: 'ScheduledMaintenance',
            // foreignKey is the "join" field
            // the name of the field on a profile that points to its parent user
            localKey: 'id'
          }
        }
      },
      methods : {
        toJson: function(){
          return _.pick(this,_.keys(ATA2K.definition.HDR_Segment));
        }
      }
    }
    );
})
.factory('AID_Segment', function (store, ATA2K) {
  return store.defineResource({
    name: 'AID_Segment',
    beforeCreate : genericBeforeCreate,
    relations: {
      belongsTo: {
        ScheduledMaintenance: {
            // localField is for linking relations
            // user.profile -> profile of the user
            localField: 'ScheduledMaintenance',
            // foreignKey is the "join" field
            // the name of the field on a profile that points to its parent user
            localKey: 'id'
          }
        }
      },
      methods : {
        toJson: function(){
          return _.pick(this,_.keys(ATA2K.definition.AID_Segment));
        }
      }
    }
    );
})
.factory('WPI_Segment', function (store, ATA2K, uibDateParser) {
  return store.defineResource({
    name: 'WPI_Segment',
    idAttribute : 'WPI',
    beforeUpdate: beforeUpdateWPI,
    afterFind : afterFind,    
    relations: {
      belongsTo: {
        ScheduledMaintenance: {
          localField: 'ScheduledMaintenance',
          localKey: 'WPI'
        }
      }
    },
    methods : {
      toJson: function(){
        return ATA2K.toJson('WPI_Segment', this);
      }
    }
  }
  );

  function beforeUpdateWPI(Resource, data, cb){
    data.WOE = convertDate(data.WOE) ;
    data.WOD = convertDate(data.WOD) ;
    cb(null, data);
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

  function afterFind(Resource, data, cb){

    cb(null, data);
  }
})
.factory('ScheduledMaintenanceEvents', function (store) {
  return store.defineResource({
    name: 'ScheduledMaintenanceEvents',
    relations: {
      belongsTo: {
        ScheduledMaintenance: {
            // localField is for linking relations
            // user.profile -> profile of the user
            localField: 'ScheduledMaintenance',
            // foreignKey is the "join" field
            // the name of the field on a profile that points to its parent user
            localKey: 'ScheduledMaintenanceEventsKey'
          }
        }
      }
    }
    );
});



function genericBeforeCreate(Resource, data, cb){
  cb(null, data);
}
