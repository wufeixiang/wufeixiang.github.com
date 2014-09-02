'use strict';

/*
 * 一些小的控制器也写在这
 */

angular.module('myControllers').controller('MyCtrl', function($scope, $http, $ionicPopup) {
	$scope.myInfo = {};
	$scope.news = 0;
	
	$scope.doShare = function() {
		var title = "提示";
		var message = "功能正在开发中，敬请期待";
		var alertPopup = $ionicPopup.alert({
			title : title,
			template : message
		});
	}

	$scope.loadInfo = function() {
		var url = _GLOBAL.api + '/getUserSummary/username/' + _userInfo.username;
		$http.get(url).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.myInfo = data;
				$scope.myInfo.devicename = _userInfo.devicename;
			}
		});
	}
	$scope.loadInfo();

}).controller('MyMessageCtrl', function($scope, $http) {
	$scope.next_id = 0;
	$scope.list = [];

	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getMyNews/username/' + _userInfo.username + '/id/' + $scope.next_id;
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
	};
	$scope.doRefresh = function() {
		$scope.next_id = 0;
		var url = _GLOBAL.api + '/getMyNews/username/' + _userInfo.username + '/id/' + $scope.next_id;
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
	};
	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	};
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});

	$scope.loadData();
}).controller('FeedCtrl', function($scope, $http) {
	$scope.addFeed = function() {
		var url = _GLOBAL.api + '/setFeed/';
		$scope.feed.uid = _userInfo.uid;
		-$http.post(url, this.feed).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.reply.content = "";
				$scope.list.splice(0, 0, data);
			}
		});
	}
}).controller('AboutCtrl', function($scope, $http) {
	console.log("FeedCtrl");
}).controller('MySettingCtrl', function($scope, $http) {
	console.log("MySettingCtrl");
});

