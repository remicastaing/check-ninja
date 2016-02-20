'use strict';

describe('Service: checkhelper', function () {

  // load the service's module
  beforeEach(module('itechApp'));

  // instantiate service
  var checkhelper;
  beforeEach(inject(function (_checkhelper_) {
    checkhelper = _checkhelper_;
  }));

  it('should do something', function () {
    !!checkhelper.should.be.true;
  });

});
