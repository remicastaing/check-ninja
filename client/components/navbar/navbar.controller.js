'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main',
  },
  {
    'title': 'Checks',
    'state': 'checks',
  },
    {
    'title': 'References',
    'state': 'references',
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('itechApp')
  .controller('NavbarController', NavbarController);
