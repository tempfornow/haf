angular.module("myapp", [])
	.controller("SoldiersController", function($scope) {
		<!-- Initial soldiers list -->
		$scope.soldiersList = []
		<!-- List of valid ages(valid age of a soldier) -->
		$scope.validAges = _.range(18,121)
		$scope.validRanks = ['קמ"א','קא"ב',
			'טוראי','רב"ט','סמל','סמ"ר','רס"ל','רס"ר','רס"ם','רס"ב','רנ"ם','רנ"ג',
			'סג"ם','סגן','סרן','רס"ן','סא"ל','אל"מ','תא"ל','אלוף','רא"ל']
		<!-- list of ranks -->
		<!-- Adds soldier according to given data about him -->
		$scope.addSoldier = function(name,age,rank,discharge) {
			$scope.soldiersList.push({name,age,rank,discharge})
		}
	});  