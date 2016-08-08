'use strict';

describe('Component: ReferencesComponent', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var ReferencesComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ReferencesComponent = $componentController('ReferencesComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
