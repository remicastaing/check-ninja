(function() {
  'use strict';



  angular
    .module('itechApp')
    .controller('CardController', CardController);

  function CardController($scope, $state)  {
    var vm = this;
		
    var card;
  
    if (typeof $scope.data.then === 'function'){
      $scope.data.then(function(data){
        card = data;
        vm.card = card;
        console.log(card);
      })
    } else {
      card = $scope.data;
      vm.card = card;
    }

    vm.save = function() {
      card.DSUpdate(card)
      .then(function(data){
        $state.go('check', {WPI: card.WPI});
      },
      function(err){console.log(err);});
    };

  };



})();