angular.module('myApp', []).controller('imageDetailCtrl', ['$scope', '$http', '$firebase',
	function($scope, $http, $firebase) {
		$scope.list = [];

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
			$scope.list = $firebase(query).$asArray();
		}

		$scope.$on('stateChangeSuccess', function() {
			$scope.loadMore();
		});
		$scope.loadMore = function() {
			$scope.loadData();
		}

		$scope.hasMoreData = true;
		$scope.moreDataCanBeLoaded = function() {
			return $scope.hasMoreData;
		}

		$scope.addComment = function(obj) {
			var id = obj.CloudID;
			var url = _GLOBAL.api + '/setFavor/username/' + _userInfo.username + '/CloudID/' + id;
			$http.get(url).success(function(ret) {
				var status = ret.status;
				if (status == 1) {
					obj.favor = true;
				}
			});
		}
	}
]);