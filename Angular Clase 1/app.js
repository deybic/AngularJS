

var app = angular.module("luxiz", []);

app.controller("FirstCntrl", function($scope)
	{
		$scope.arreglo = [

			{
				"name"	: "Deybi",
				"age"	: "32",
				"monto"	: "20,000"
			}

		]	



		$scope.nuevaPersona = function(){

			$scope.arreglo.push({"name": $scope.newName, "age": $scope.newAge, "monto": $scope.newMonto});
			$scope.newName = "";
			$scope.newAge = "";
			$scope.newMonto = "";
		}

		$scope.delete = function(index){
			$scope.arreglo.splice(index,1);
		}


	});

app.controller("SecondCntrl", function($scope)
	{
		$scope.dias = [

			{
				"dia"	: "Lunes",
			}

		]	



		$scope.nuevoDia = function(){

			$scope.dias.push({"name": $scope.newDia});
			$scope.newDia= "";
		}

		$scope.deleteDia = function(index){
			$scope.dias.splice(index,1);
		}


	});