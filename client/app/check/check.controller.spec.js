'use strict';

describe('Controller: CheckCtrl', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var CheckCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckCtrl = $controller('CheckCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
