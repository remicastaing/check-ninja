'use strict';
(function(){

  function SaveDeleteCancel($state) {
    var ctrl = this;

    ctrl.close = function(){
      if (ctrl.back){
        $state.go(ctrl.back.to, ctrl.back.param);
      } else {
        delete ctrl.data;
      }
    };

    ctrl.save = function(){
      if (ctrl.model) {
         ctrl.model.create(ctrl.data).then(function(){
            console.log(ctrl.data);
            ctrl.close();
          }, function(err){console.log(err)});
       } else {
        ctrl.data.DSUpdate(ctrl.data).then(function(){
          ctrl.close();
        }, function(err){console.log(err)});
       }
    }

    ctrl.delete = function(){
      ctrl.model.destroy(ctrl.data).then(function(){
        delete ctrl.data;
      }, function(err){console.log(err)});
    }

  }



  angular.module('itechApp')
  .component('saveDeleteCancel', {
    templateUrl: 'components/fields/save-delete-cancel/save-delete-cancel.html',
    controller: SaveDeleteCancel,
    bindings: {
      data: '=',
      model: '=?',
      deletable : '=',
      back : '<'
    }
  });

})();
