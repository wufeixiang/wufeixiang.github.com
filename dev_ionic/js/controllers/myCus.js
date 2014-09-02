'use strict';

/**
 * 推荐首页
 */
angular.module('myControllers').controller('MyResourceCtrl', ['$scope', '$http',
function($scope, $http) {
	$scope.list = [];
	$scope.id = 0;

	$scope.loadMyResource = function() {
		var url = _GLOBAL.api + '/getMyResource/username/' + _userInfo.username + '/id/' +  $scope.id;
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
		$scope.loadMyResource();
	}

	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	}

	// $scope.loadMyResource();
}]);
