'use strict';

describe('Controller: FindingCtrl', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var FindingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FindingCtrl = $controller('FindingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
