'use strict';

/**
 * 推荐首页
 */
angular.module('myControllers').controller('MyResourceCtrl', ['$scope', '$http',
function($scope, $http) {
	$scope.list = [];
	$scope.id = 0;

	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getCustomerList/username/' + _userInfo.username + '/token/' + _userInfo.token;
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
	$scope.loadData();
}]).controller('MyResourceDetailCtrl', ['$scope', '$http', '$stateParams',
function($scope, $http, $stateParams) {
	$scope.list = [];
	$scope.id = 0;
	$scope.cid = $stateParams.cid;

	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getResourceByCid/username/' + _userInfo.username + "/cid/" + $scope.cid + "/id/" + $scope.id;
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
	
	$scope.loadMore = function() {
		$scope.loadData();
	};
	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	};
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});
	
	
}]);
