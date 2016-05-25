'use strict';
(function(){

function TestComponent(store, Triangle, Point) {
	  

	store.utils.Promise.all([
	  // clean up, so my firebase doesn't get filled up
	  Triangle.destroyAll(),
	  Point.destroyAll()
	]).then(function() {
	  return Point.create({
	      x: 0,
	      y: 0
	    });
	}).then(function(point) {
	  return Triangle.create({
	    type: 'equilateral',
	    point1Key: point.id
	  });
	}).then(function(triangle) {
	  console.log(triangle);

	  // let's load the triangle's points
	  // instead of "['point']" you could do "['point1', 'point2', 'point3']"
	  return Triangle.loadRelations(triangle.id, ['point']);
	}).then(function(triangle) {
	  console.log(triangle);
	  return Triangle.update(triangle.id, {
	    type: 'foobar'
	  });
	}).then(function(triangle) {
	  console.log(triangle);
	  return store.utils.Promise.all([
	    // clean up again, so my firebase doesn't get filled up
	    //Triangle.destroyAll(),
	    //Point.destroyAll()
	  ]);
	});
}

angular.module('itechApp')
  .component('test', {
    templateUrl: 'app/test/test.html',
    controller: TestComponent
  })
  .factory('Triangle', function(store) {
    return store.defineResource({
      name: 'triangle',
      relations: {
        hasOne: {
          point: {
            localKey: 'point1Key',
            localField: 'point1'
          }
        }
      }
    });
  })
  .factory('Point', function(store) {
    return store.defineResource({
      name: 'point'
    });
  });

})();
