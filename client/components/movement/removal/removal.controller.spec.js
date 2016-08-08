'use strict';

describe('Component: removal', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var removal, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    removal = $componentController('removal', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
