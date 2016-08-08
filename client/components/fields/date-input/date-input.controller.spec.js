'use strict';

describe('Component: installation', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var installation, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    installation = $componentController('installation', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
