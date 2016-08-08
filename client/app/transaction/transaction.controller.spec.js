'use strict';

describe('Component: TransactionComponent', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var TransactionComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TransactionComponent = $componentController('TransactionComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
