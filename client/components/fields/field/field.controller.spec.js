'use strict';

describe('Component: field', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var field, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    field = $componentController('field', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
