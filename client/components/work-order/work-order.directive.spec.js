'use strict';

describe('Directive: WorkOrder', function () {

  // load the directive's module and view
  beforeEach(module('itechApp'));
  beforeEach(module('components/work-order/work-order.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<work-order></work-order>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the WorkOrder directive');
  }));
});
