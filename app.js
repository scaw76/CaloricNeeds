//alert("Test from app.js");
(function () {
	angular.module('HelloAngular', ['ngRoute','ngResource'])
	.config(function ($routeProvider){
		$routeProvider
		.when("/calculator",{
			controller: 'MainController',
			templateUrl: 'calculator.html'
		});
	});
	
})();
