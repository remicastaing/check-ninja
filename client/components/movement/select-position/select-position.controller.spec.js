'use strict';

describe('Component: selectPosition', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var selectPosition, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    selectPosition = $componentController('selectPosition', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
