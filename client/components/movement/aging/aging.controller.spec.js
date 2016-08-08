'use strict';

describe('Component: aging', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var aging, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    aging = $componentController('aging', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});

