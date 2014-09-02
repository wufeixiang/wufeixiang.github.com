'use strict';

angular.module('myControllers').controller('MyFavorCtrl', ['$scope', '$http',
function($scope, $http) {
	$scope.list = [];
	$scope.id = 0;

	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getFavor/username/' + _userInfo.username + '/id/' + $scope.id;
		$http.get(url).success(function(ret) {
			var data = ret.data;
			var status = ret.status;
			if (data != null && status == 1) {
				$scope.list.push.apply($scope.list, data);
				$scope.id = data[data.length - 1].id;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.hasMoreData = false;
			}
		});
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

	// $scope.loadData();
}]).controller('MyStarCtrl', ['$scope', '$http',
function($scope, $http) {
	$scope.list = [];
	$scope.id = 0;

	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getStars/username/' + _userInfo.username + '/id/' + $scope.id;
		$http.get(url).success(function(ret) {
			var data = ret.data;
			var status = ret.status;
			if (data != null && status == 1) {
				$scope.list = data;
				// $scope.id = data[data.length - 1].id;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.hasMoreData = false;
			}
		});
	}
	
	// $scope.loadData();

}]);
