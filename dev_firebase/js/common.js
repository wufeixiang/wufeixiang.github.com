var myApp = angular.module("myApp", ["firebase"]);

myApp.controller('MyController', ['$scope', '$firebase',
	function($scope, $firebase) {
		var ref = new Firebase("https://icup.firebaseio.com/");
		var query = ref.endAt().limit(10);
		$scope.messages = $firebase(query).$asArray();

		$scope.addMessage = function(e) {
			//LISTEN FOR RETURN KEY
			if (e.keyCode === 13 && $scope.msg) {
				var current_time = date2str(new Date(),"yyyy-MM-dd hh:mm:ss");
				//ALLOW CUSTOM OR ANONYMOUS USER NAMES
				var name = $scope.name || 'anonymous';
				$scope.messages.$add({
					from: name,
					body: $scope.msg,
					writetime: current_time
				});
				//RESET MESSAGE
				$scope.msg = "";
			}
		}
	}
]);
function date2str(x,y){var z ={M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v){return((v.length>1 ? "0":"")+eval('z.'+v.slice(-1))).slice(-2)});return y.replace(/(y+)/g,function(v){return x.getFullYear().toString().slice(-v.length)})}