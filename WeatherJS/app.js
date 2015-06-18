/**
 * Created by chavarde on 17/06/2015.
 */
var app = angular.module('weatherJS',[]);

app.config(function($httpProvider){
    $httpProvider.defaults.useDomain = true;
});

app.factory('Weather',['$http', '$q', function($http, $q){

    var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=San%20Jose,cr&mode=json&units=metric&cnt=2';

    return {

        getAll : function(){

            var defer = $q.defer();

            $http({
                method:'GET',
                url:URL,
                dataType: 'jsonp',
                headers: {'Content-Type': 'application/json'}
            }).
                success(function(data, status, headers, config){
                    defer.resolve(data);
                }).
                error(function(data, status, headers, config){
                    defer.reject(data);
                });

            return defer.promise;
        }
    }

}]);

app.controller('WeatherCtrl', ['$scope', 'Weather', function($scope, Weather){


    //Carga los datos del factory
    Weather.getAll().then( function(data){


        //Cuando los recive los guarda en un arreglo de tshirts
        $scope.city = data.city;
        $scope.onedayWeather = data.list[0].weather[0];
        $scope.onedaytemp = data.list[0].temp;
        $scope.seconddayWeather = data.list[1].weather[0];
        $scope.seconddaytemp = data.list[1].temp;
        console.log(data);

    });


}]);