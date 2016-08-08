'use strict';

describe('Component: removalButton', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var removalButton, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    removalButton = $componentController('removalButton', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});

