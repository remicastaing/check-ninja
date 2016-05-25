'use strict';

angular.module('itechApp')
.factory('NRF_Segment', function (store, ATA2K) {
  return store.defineResource({
    name: 'NRF_Segment',
    //idAttribute : 'key', 
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
        }
      },
      methods : {
        toJson: function(){
          return _.pick(this,_.keys(ATA2K.definition.NRF_Segment));
        }
      }
    }
    );
}).run(function (NRF_Segment) {})