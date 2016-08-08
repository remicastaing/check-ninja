'use strict';
(function(){

function ReferencesUpload(x2js, Reference, store) {
  var vm = this;

  var references = {};

  vm.loadReferences= function($fileContent){
      references = x2js.xml_str2json(utf8.decode($fileContent)).References;

      vm.referencesReady = true;

      

  };

  vm.save = function() {

        var createnomenclature = _.map( references.Reference.length ? references.Reference: [references.Reference], function(reference){Reference.create(reference)});

        store.utils.Promise.all(createnomenclature).then(function(){

        }, function(err){console.log(err);});
      };

  vm.clear = function(){
    Reference.destroyAll();
  }

}

angular.module('itechApp')
  .component('referencesUpload', {
    templateUrl: 'components/referencesUpload/referencesUpload.html',
    controller: ReferencesUpload,
    bindings: {
      att: '=',
      atn: '=',
      onUpdate: '&'
    }
  });

})();
