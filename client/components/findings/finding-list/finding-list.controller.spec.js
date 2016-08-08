'use strict';

describe('Controller: FindingListCtrl', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var FindingListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FindingListCtrl = $controller('FindingListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
