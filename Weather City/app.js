 var app = angular.module('weather',['ngRoute']);

//Configuramos las rutas mediante el route provider
	app.config(function($routeProvider) {
		$routeProvider

			.when('/', {
				templateUrl : 'partials/home.html',
				controller  : 'mainController'
			})
        
            .when('/clima/:cityName', {
				templateUrl : 'partials/clima.html',
				controller  : 'WeatherCtrl'
			});
	});


app.factory('Weather',['$http', '$q', function($http, $q){

    var URL = 'http://api.openweathermap.org/data/2.5/weather'; //?q=London,uk

    return {

        getSelected : function(cityName){

            var defer = $q.defer();

            $http({
                method:'GET',
                url:URL,
                dataType: 'jsonp',
                //headers: {'Content-Type': 'application/json'},
                params:
                {
                    q: cityName,
                }
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


app.controller('mainController', function($scope) {
		$scope.message = 'Angular.js Rocks!';
});



app.controller('WeatherCtrl',['$scope', '$routeParams' , 'Weather', function($scope, $routeParams, Weather){
    
    //Carga los datos del factory
    Weather.getSelected($routeParams.cityName).then( function(data){


        //Cuando los recive los guarda en un arreglo de tshirts
        $scope.clima = data;
        $scope.city = data.name;
        $scope.country = data.sys.country;
        $scope.imageWeather = data.weather[0].icon;
        $scope.tempMax = data.main.temp_max;
        $scope.tempMin = data.main.temp_min;
        $scope.wind = data.wind;
        $scope.weather = data.weather[0];
        $scope.sys = data.sys;
        $scope.coord = data.coord;
        $scope.main = data.main;
        
        
    });


}]);