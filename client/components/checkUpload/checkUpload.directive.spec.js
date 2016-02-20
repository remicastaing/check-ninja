'use strict';

describe('Directive: checkUpload', function () {

  // load the directive's module and view
  beforeEach(module('itechApp'));
  beforeEach(module('components/checkUpload/checkUpload.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<check-upload></check-upload>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the checkUpload directive');
  }));
});
