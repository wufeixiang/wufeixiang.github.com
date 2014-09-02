'use strict';

/**
 *  个人主页
 */
angular.module('myControllers').controller('UserCtrl', ['$scope', '$http', '$stateParams','$window',
function($scope, $http, $stateParams,$window) {
	$scope.next_id = 0;
	$scope.list = [];
	$scope.username = $stateParams.username ; 

	// 设计图概况
	$scope.loadSummary = function() {
		var url = _GLOBAL.api + '/getUserSummary/username/' + $scope.username;
		$http.get(url).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.userInfo = data;
			}else{
				
			}
		});
	}
	$scope.loadSummary();
	
	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getMyPlans/username/' + $scope.username + '/id/' + $scope.next_id;
		$http.get(url).success(function(ret) {
			var data = ret.data;
			var status = ret.status;
			if (data != null && status == 1) {
				var data = ret.data;
				$scope.list.push.apply($scope.list, data);
				$scope.next_id = data[data.length - 1].CloudID;
				
				$scope.$broadcast('scroll.infiniteScrollComplete');
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
	
	// 关注某人
	$scope.stared = false ;
	$scope.addStar = function(){
		$scope.catalog = 1 ;
		var catalog = $scope.catalog ; 
		var url = _GLOBAL.api + '/setStar/username/' + _userInfo.username + '/star/' + $scope.username + "/catalog/" + catalog;
		$http.get(url).success(function(ret) {
			var status = ret.status;
			if (status == 1) {
				$scope.stared = true;
			}
		});
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
	$scope.goBack = function(){
		$window.history.back();
	}
}]);
