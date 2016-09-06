'use strict';

describe('Component: installationsList', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var installationsList, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    installationsList = $componentController('installationsList', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
