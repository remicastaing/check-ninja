'use strict';

describe('Component: TestComponent', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var TestComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TestComponent = $componentController('TestComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
