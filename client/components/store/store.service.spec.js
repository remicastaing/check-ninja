'use strict';

describe('Service: store', function () {

  // load the service's module
  beforeEach(module('itechApp'));

  // instantiate service
  var store;
  beforeEach(inject(function (_store_) {
    store = _store_;
  }));

  it('should do something', function () {
    !!store.should.be.true;
  });

});
