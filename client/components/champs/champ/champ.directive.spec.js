'use strict';

describe('Directive: champ', function () {

  // load the directive's module and view
  beforeEach(module('itechApp'));
  beforeEach(module('app/components/champs/champ/champ.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<champ></champ>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the champ directive');
  }));
});
