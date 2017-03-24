//alert("Test from service.js");
(function(){

	var saveData = function(key, o) {
		var s = JSON.stringify(o);
		localStorage.setItem(key,s);
	};
	var loadData = function(key) {
		var s = localStorage.getItem(key);
		return JSON.parse(s);
	};

	angular.module('HelloAngular').service('DataService',function(){
		var log = loadData('log');
		if (log == null){
			var log = [];
		}
		var genders = [{
			name: 'male',
			base: 88.362,
			weight: 13.397,
			height: 4.799,
			age: 5.677},{
			name: 'female',
			base: 447.593,
			weight: 9.247,
			height: 3.098,
			age: 4.33
		}];

		var exercise = [{
			info: 'Light to no exercise',
			value: 1.2 },{
			info: 'Light exercise (1-3 days per week)',
			value: 1.375,},{
			info: 'Moderate exercise (3-5 days per week)',
			value: 1.55,},{
			info: 'Heavy exercise (6-7 days per week)',
			value: 1.725,},{
			info: 'Very heavy exercise (twice per day, extra heavy workouts)',
			value: 1.97,
		}];

		var measurements = [{
			name: 'Metric',
			checked: false},{
			name: 'Standard',
			checked: true
		}];
		

		var feet = [1,2,3,4,5,6,7,8];
		var inches = [1,2,3,4,5,6,7,8,9,10,11];

		this.getLog = function(){
			return log;
		};
		this.addLog = function(l){
			log.push(l);
			saveData("log",log);
		}
		this.resetLog = function(){
			log = [];
			saveData("log",log);
		}

		this.getErrors = function(){
			return errors;
		};

		this.getStandard = function (){
			return measurements[1].checked;
		};

		this.getMeasurements= function(){
			return measurements;
		};

		this.getExercises= function(){
			return exercise;
		};
		this.getColors = function(){
			return colors;
		};
		this.getFeet = function(){
			return feet;
		};
		this.getInches = function(){
			return inches;
		};
		this.getGenders = function (){
			return genders;
		};

	});
})();