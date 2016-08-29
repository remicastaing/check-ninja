'use strict';

angular.module('itechApp', [
  'itechApp.auth',
  'itechApp.admin',
  'itechApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'cb.x2js',
  'ui.grid', 'ui.grid.treeView', 'ui.grid.autoResize',
  'ui.bootstrap.datepicker',
  'ui.bootstrap.modal',
  'js-data'
])
  .config(function($urlRouterProvider, $locationProvider,$qProvider) {
    
    $qProvider.errorOnUnhandledRejections(false);

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    /*$localForageProvider.config({
        driver      : localforage.LOCALSTORAGE, // Force WebSQL; same as using setDriver()
        name        : 'check-ninja',
        version     : 0.1,
        //size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
        storeName   : 'check-store', // Should be alphanumeric, with underscores.
        description : 'Check Store'
    });*/

    
  });
  // .run(function (DS) {
  //   //DS.registerAdapter('localforage', DSLocalForageAdapter, { default: true });
  //   var adapter = new DSLocalForageAdapter();
  //   DS.registerAdapter('localstorage',  adapter, { default: true });
  // });
