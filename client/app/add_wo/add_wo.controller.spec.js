'use strict';

describe('Controller: AddWoCtrl', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var AddWoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddWoCtrl = $controller('AddWoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
