'use strict';

angular.module('myControllers').controller('MyCommentsCtrl', function($scope, $http) {
	$scope.next_id = 0;
	$scope.list = [];

	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getMyComments/username/' + _userInfo.username +'/id/' + $scope.next_id;
		$http.get(url).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.list.push.apply($scope.list, data);
				$scope.next_id = data[data.length - 1].id;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.hasMoreData = false;
			}
		});
	}
	
	$scope.doRefresh = function() {
		$scope.next_id = 0;
		var url = _GLOBAL.api + '/getMyComments/username/' + _userInfo.username +'/id/' + $scope.next_id;
		$http.get(url).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.list = data;
				$scope.next_id = data[data.length - 1].id;
				$scope.$broadcast('scroll.refreshComplete');
			} else {
				$scope.hasMoreData = false;
			}
		});
	}

	$scope.loadMore = function() {
		$scope.loadData();
	}
	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	}
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});

	// $scope.loadData();

});
