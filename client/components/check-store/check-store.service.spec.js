'use strict';

describe('Service: checkStore', function () {

  // load the service's module
  beforeEach(module('itechApp'));

  // instantiate service
  var checkStore;
  beforeEach(inject(function (_checkStore_) {
    checkStore = _checkStore_;
  }));

  it('should do something', function () {
    !!checkStore.should.be.true;
  });

});
