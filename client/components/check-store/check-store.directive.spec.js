'use strict';

describe('Directive: checkStore', function () {

  // load the directive's module and view
  beforeEach(module('itechApp'));
  beforeEach(module('components/check-store/check-store.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<check-store></check-store>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the checkStore directive');
  }));
});
