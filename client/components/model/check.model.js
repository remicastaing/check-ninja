'use strict';

angular.module('itechApp')
.factory('Check', function (store) {
  return store.defineResource({
    name: 'check',
    idAttribute : 'WPI',
    hasOne: {
      profile: {
          // localField is for linking relations
          // user.profile -> profile of the user
          localField: 'kardex',
          // foreignKey is the "join" field
          // the name of the field on a profile that points to its parent user
          foreignKey: 'userId'
        }
      }
    }
    );
});