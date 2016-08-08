'use strict';

describe('Component: movement', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var movement, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    movement = $componentController('movement', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
