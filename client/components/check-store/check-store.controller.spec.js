'use strict';

describe('Controller: CheckStoreCtrl', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var CheckStoreCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckStoreCtrl = $controller('CheckStoreCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
