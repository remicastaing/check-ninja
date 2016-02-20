'use strict';

describe('Directive: item', function () {

  // load the directive's module and view
  beforeEach(module('itechApp'));
  beforeEach(module('components/item/item.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<item></item>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the item directive');
  }));
});
