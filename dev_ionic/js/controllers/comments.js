'use strict';

angular.module('myControllers').controller('CommentsCtrl', function($scope, $http) {
	$scope.next_id = 0;
	$scope.list = [];

	$scope.loadComments = function() {
		var url = _GLOBAL.api + '/getComments/id/' + $scope.next_id;
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
		var url = _GLOBAL.api + '/getComments/id/' + $scope.next_id;
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
		$scope.loadComments();
	};
	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	};
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});

	// $scope.loadComments();

	// 点赞
	$scope.setGood = function(obj) {
		var id = obj.id;
		var url = _GLOBAL.api + '/setGood/id/' + id;
		$http.get(url).success(function(ret) {
			var status = ret.status;
			if (status == 1) {
				obj.good_cnt = parseInt(obj.good_cnt) + 1;
			}
		});
	}
	
	$scope.reply = {};
	// 对某人回复，向输入框加入@xxx
	// 这里暂时只做 @xxx 的处理
	$scope.setReply = function(obj) {
		var _name = obj.name;
		var _username = obj.username;
		$scope.reply.content = "@" + _name + " ";
		$scope.reply.touser = _name;
		var textarea = document.querySelector('input[name="content"]');
		textarea.focus();
		// console.log(this.reply);
	}
	// 发表评论
	$scope.name = _userInfo.name;
	$scope.reply.username = _userInfo.username;
	$scope.reply.deviceuid = _userInfo.deviceuid;
	$scope.addReply = function() {
		console.log($scope.reply);
		var url = _GLOBAL.api + '/setComment/';
		$http.post(url, this.reply).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.reply.content = "";
				$scope.list.splice(0, 0, data);
			}
		});
	}
});
