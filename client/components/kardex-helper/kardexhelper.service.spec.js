'use strict';

describe('Service: kardexhelper', function () {

  // load the service's module
  beforeEach(module('itechApp'));

  // instantiate service
  var kardexhelper;
  beforeEach(inject(function (_kardexhelper_) {
    kardexhelper = _kardexhelper_;
  }));

  it('should do something', function () {
    !!kardexhelper.should.be.true;
  });

});
