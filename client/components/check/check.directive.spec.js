'use strict';

describe('Directive: check', function () {

  // load the directive's module and view
  beforeEach(module('itechApp'));
  beforeEach(module('components/check/check.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<check></check>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the check directive');
  }));
});
