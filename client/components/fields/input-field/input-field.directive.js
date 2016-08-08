'use strict';

angular.module('itechApp')
  .directive('champ_old', function () {
    return {
      templateUrl: 'components/champs/champ/champ.html',
      scope: {
                titre: '=titre',
                valeur: '=valeur'
            },
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controllerAs: 'champ',
    };
  });
