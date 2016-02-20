'use strict';

describe('Controller: ItemCtrl', function () {

  // load the controller's module
  beforeEach(module('itechApp'));

  var ItemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemCtrl = $controller('ItemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
