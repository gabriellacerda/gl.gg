var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/home.html",
        controller: "homeController"
    });
});
app.controller("homeController", function ($scope, $http, $location) {

    if (window.localStorage['summoner']) {

      var accessData = window.localStorage['summoner']; 

      $scope.summonerData = angular.fromJson(accessData);

    };

    $scope.tryAgain = function () {
      window.localStorage.clear();
      window.location = '/';
    };

    $scope.getProfilePicture = function (iconId) {

      $http({
              url: '/summoner/info/icon/' + iconId,
              method: 'GET'
            }).then(function successCallback(response) {
                return response.data;
              }, function errorCallback(response) {
                return false;
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
    };

    $scope.submit = function() {
        if ($scope.summonerName && $scope.summonerRegion) {

            let name = this.summonerName;
            let region = this.summonerRegion;

            $http({
              url: '/summoner/info',
              method: 'POST',
              data: 
              { 
                'name': this.summonerName, 
                'region': this.summonerRegion
              }
            }).then(function successCallback(response) {
                response.data.revisionDate = new Date(response.data.revisionDate).toString("MMM dd");
                window.localStorage['summoner'] = angular.toJson(response.data);
                window.location = '/';
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });

            $scope.summonerName = '';
        }
    }
});

