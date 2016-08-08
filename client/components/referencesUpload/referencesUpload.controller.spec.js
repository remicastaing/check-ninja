'use strict';

describe('Component: referencesUpload', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var referencesUpload, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    referencesUpload = $componentController('referencesUpload', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});

