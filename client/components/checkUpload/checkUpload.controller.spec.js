'use strict';

describe('Controller: CheckUploadCtrl', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var CheckUploadCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckUploadCtrl = $controller('CheckUploadCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
