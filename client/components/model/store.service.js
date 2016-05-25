'use strict';

angular.module('itechApp')
  .factory('store', function () {
    var store = new JSData.DS();

    store.registerAdapter('localstorage', new DSLocalStorageAdapter(), { default: true });

    return store;
  });

