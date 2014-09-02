'use strict';

angular.module('myControllers').controller('ExploreDetailCtrl', ['$scope', '$http', '$stateParams',
function($scope, $http, $stateParams) {
	$scope.list = [];
	$scope.id = 0;
	$scope.type = $stateParams.type;
	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getListByType/type/' + $scope.type + '/id/' + $scope.id;
		$http.get(url).success(function(ret) {
			var status = ret.status;
			if (status == 1) {
				var data = ret.data;
				$scope.id = data[data.length - 1].id;
				$scope.list.push.apply($scope.list, data);

				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.hasMoreData = false;
			}
		});
	}
	// $scope.loadData();

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

	$scope.setPlanGood = function(obj) {
		var id = obj.CloudID;
		var url = _GLOBAL.api + '/setPlanGood/id/' + id;
		$http.get(url).success(function(ret) {
			var status = ret.status;
			if (status == 1) {
				obj.good_cnt = parseInt(obj.good_cnt) + 1;
			}
		});
	}
	$scope.setPlanFavor = function(obj) {
		var id = obj.CloudID;

		var url = _GLOBAL.api + '/setFavor/username/' + _userInfo.username + '/CloudID/' + $scope.CloudID;
		$http.get(url).success(function(ret) {
			var status = ret.status;
			if (status == 1) {
				obj.favor = true;
			}
		});
	}
}]);
