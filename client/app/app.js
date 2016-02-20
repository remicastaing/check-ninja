'use strict';

angular.module('itechApp', [
  'itechApp.auth',
  'itechApp.admin',
  'itechApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'cb.x2js',
  'ui.grid', 'ui.grid.treeView', 'ui.bootstrap.datepicker',
  'LocalForageModule',
  'js-data'
])
  .config(function($urlRouterProvider, $locationProvider, $localForageProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    $localForageProvider.config({
        driver      : localforage.LOCALSTORAGE, // Force WebSQL; same as using setDriver()
        name        : 'check-ninja',
        version     : 0.1,
        //size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
        storeName   : 'check-store', // Should be alphanumeric, with underscores.
        description : 'Check Store'
    });

    
  });
