'use strict';

angular.module('itechApp.auth', [
  'itechApp.constants',
  'itechApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
