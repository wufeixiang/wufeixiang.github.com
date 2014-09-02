'use strict';

angular.module('myControllers').controller('IndexDetailCtrl', ['$scope', '$http', '$stateParams',
function($scope, $http, $stateParams) {
	$scope.CloudID = $stateParams.CloudID;
	// 加载该图的信息
	$scope.loadRoom = function() {
		var url = _GLOBAL.api + '/getPlan/id/' + $scope.CloudID;
		$http.get(url).success(function(ret) {
			var status = ret.status;
			if (status == 1) {
				var data = ret.data;
				$scope.room = data;
			}
		});
	}
	$scope.loadRoom();

	// 加载评论
	$scope.list = [];
	$scope.id = 0;
	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getPlanComments/id/' + $scope.CloudID + '/last_id/' + $scope.id;
		$http.get(url).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				// console.log(data);
				$scope.list.push.apply($scope.list, data);
				$scope.id = data[data.length - 1].id;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.hasMoreData = false;
			}
		});
	}
	// 加载评论
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
		var url = _GLOBAL.api + '/setFavor/username/' + _userInfo.username + '/CloudID/' + id;
		$http.get(url).success(function(ret) {
			var status = ret.status;
			if (status == 1) {
				obj.favor = true;
			}
		});
	}
	// 添加方案评论
	$scope.reply = {};
	$scope.name = _userInfo.name;
	$scope.reply.username = _userInfo.username;
	$scope.reply.CloudID = $scope.CloudID;
	$scope.reply.deviceuid = _userInfo.deviceuid;
	$scope.addReply = function() {
		console.log(this.reply);
		var url = _GLOBAL.api + '/setPlanComment/';
		$http.post(url, this.reply).success(function(ret) {
			// append data
			var data = ret.data;
			if (data != null) {
				$scope.reply.content = "";
				$scope.list.splice(0, 0, data);
			}
		});
	}
}]);
