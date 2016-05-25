'use strict';

describe('Directive: findingList', function () {

  // load the directive's module and view
  beforeEach(module('itechApp'));
  beforeEach(module('components/finding-list/finding-list.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<finding-list></finding-list>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the findingList directive');
  }));
});
