angular.module('myControllers').controller('ImageDetailCtrl', ['$scope', '$http', '$firebase', '$stateParams',
	function($scope, $http, $firebase, $stateParams) {
		$scope.title = $stateParams.title;
		$scope.messages = [];
		
		$scope.addMessage = function(e) {
			//LISTEN FOR RETURN KEY
			if (e.keyCode === 13 && $scope.msg) {
				var current_time = date2str(new Date(), "yyyy-MM-dd hh:mm:ss");
				var name = $scope.name || 'anonymous';
				$scope.messages.$add({
					from: name,
					body: $scope.msg,
					writetime: current_time
				});
				$scope.msg = "";
			}
		}

		$scope.loadData = function() {
			var ref = new Firebase(_GLOBAL.firebase);
			var query = ref.endAt().limit(10);
			$scope.messages = $firebase(query).$asArray();
		}
		$scope.loadData();

	}
]);