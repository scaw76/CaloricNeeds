//alert("Test from controller.js");
(function (){
	angular.module('HelloAngular').controller('MainController', function ($scope, DataService) {

		$scope.errors = false;
		$scope.log = DataService.getLog();

		$scope.feet = DataService.getFeet();
		$scope.inches = DataService.getInches();
		$scope.genders = DataService.getGenders();
		$scope.measurements = DataService.getMeasurements();
		$scope.standard = DataService.getStandard();
		$scope.exercises = DataService.getExercises();

		// preset dropdown values
		$scope.selectedFoot = $scope.feet[4];
		$scope.selectedInch = $scope.inches[6];
		$scope.selectedGender = $scope.genders[0];
		$scope.selectedExercise = $scope.exercises[0];

		// update standard or metric 
		$scope.updateSelection = function(position) {
			angular.forEach($scope.measurements, function(subscription, index) {
				if (position != index)
				subscription.checked = false;
				});
			$scope.standard = DataService.getStandard();
		};
		// everything set
		var formFilled = function(){
			if( null == ($scope.selectedGender)		|| '' == ($scope.selectedGender)	||
				null == ($scope.selectedInch)		|| '' == ($scope.selectedInch)		||
				null == ($scope.selectedFoot)		|| '' == ($scope.selectedFoot)		||
				null == ($scope.enteredAge)			|| '' == ($scope.enteredAge)		||
				null == ($scope.enteredAge)			|| '' == ($scope.enteredAge)		||
				null == ($scope.selectedExercise)	|| '' == ($scope.selectedExercise)	||
				null == ($scope.enteredWeight)		|| '' == ($scope.enteredWeight)
			){
				//console.log($scope.enteredAge);
				$scope.errors = true;
				return false;
			}
			$scope.errors = false;
			return true;
		};

		// calculate bmr and caloric need
		$scope.calc = function(){
			// everythinhg not set
			if (!formFilled()){
				return;
			}
			
			if($scope.standard){
				cm = 2.54*($scope.selectedFoot*12 + $scope.selectedInch);
				kg = ($scope.enteredWeight*0.453592);
				console.log(cm);
				console.log(kg);
			}else{ // metric
				cm = $scope.enteredheight;
				kg =  $scope.enteredWeight;
			}

			//console.log(cm);
			//console.log(kg);
			preBmr = ($scope.selectedGender.base +
					($scope.selectedGender.weight*kg) +
					($scope.selectedGender.height*cm) -
					($scope.selectedGender.age*$scope.enteredAge));
			//preCaloricNeed = ($scope.bmr*$scope.selectedExercise.value);
			$scope.bmr = Math.round(preBmr);
			$scope.caloricNeed = Math.round($scope.bmr*$scope.selectedExercise.value);
			$scope.record = {
				bmr: $scope.bmr,
				caloricNeed: $scope.caloricNeed,
				height: Math.round(cm),
				weight: Math.round(kg),
				age: $scope.enteredAge,
				gender: $scope.selectedGender.name,
				exercise: $scope.selectedExercise.info
			};
			DataService.addLog($scope.record);

			//console.log($scope.bmr);
			//console.log($scope.caloricNeed);
		};
		$scope.deleteLog = function (){
			DataService.resetLog();
			$scope.log = DataService.getLog();
		}

	});
})();