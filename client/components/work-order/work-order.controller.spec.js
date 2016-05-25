'use strict';

describe('Controller: WorkOrderCtrl', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var WorkOrderCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkOrderCtrl = $controller('WorkOrderCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
