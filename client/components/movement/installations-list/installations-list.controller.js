'use strict';
(function(){

function InstallationsList() {
  var ctrl = this;




}



angular.module('itechApp')
  .component('installationsList', {
    templateUrl: 'components/movement/installations-list/installations-list.html',
    controller: InstallationsList,
    bindings: {
	    installations: '<'
	  }
  });

})();
