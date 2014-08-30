var myApp = angular.module("myApp", ["firebase"]);

myApp.controller('MyController', ['$scope', '$firebase',
	function($scope, $firebase) {
		var ref = new Firebase("https://icup.firebaseio.com/");
		$scope.messages = $firebase(ref).$asArray();

		$scope.addMessage = function(e) {

			//LISTEN FOR RETURN KEY
			if (e.keyCode === 13 && $scope.msg) {
				//ALLOW CUSTOM OR ANONYMOUS USER NAMES
				var name = $scope.name || 'anonymous';
				$scope.messages.$add({
					from: name,
					body: $scope.msg
				});
				//RESET MESSAGE
				$scope.msg = "";
			}
		}
	}
]);