'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])


.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}])

    .controller("modalDemo", function($scope, $rootScope) {
        $scope.leftVisible = false;
        $scope.rightVisible = false;

        $scope.close = function() {
            $scope.leftVisible = false;
            $scope.rightVisible = false;
        };

        $scope.showLeft = function(e) {
            $scope.leftVisible = true;
            e.stopPropagation();
        };

        $scope.showRight = function(e) {
            $scope.rightVisible = true;
            e.stopPropagation();
        }

        $rootScope.$on("documentClicked", _close);
        $rootScope.$on("escapePressed", _close);

        function _close() {
            $scope.$apply(function() {
                $scope.close();
            });
        }
    })

    .run(function($rootScope) {
        document.addEventListener("keyup", function(e) {
            if (e.keyCode === 27)
                $rootScope.$broadcast("escapePressed", e.target);
        });

        document.addEventListener("click", function(e) {
            $rootScope.$broadcast("documentClicked", e.target);
        });
    })



.directive("menu", function() {
    return {
        restrict: "E",
        template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
        transclude: true,
        scope: {
            visible: "=",
            alignment: "@"
        }
    };
})

.directive("menuItem", function() {
    return {
        restrict: "E",
        template: "<div ng-click='navigate()' ng-transclude></div>",
        transclude: true,
        scope: {
            hash: "@"
        },
        link: function($scope) {
            $scope.navigate = function() {
                window.location.hash = $scope.hash;
            }
        }
    }
});

    // .controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
    //     $scope.toggleLeft = buildToggler('left');
    //     $scope.toggleRight = buildToggler('right');
    //
    //     function buildToggler(componentId) {
    //         return function () {
    //             $mdSidenav(componentId).toggle();
    //         };
    //     }
    // });