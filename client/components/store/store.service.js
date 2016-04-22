'use strict';

angular.module('itechApp')
  .factory('store', function () {
    var store = new JSData.DS();

    store.registerAdapter('localforage', new DSLocalForageAdapter(), { default: true });

    return store;
  })
  .factory('Check', function (store) {
    return store.defineResource({
      name: 'check',
      idAttribute : 'WPI'
    }
      );
  });
