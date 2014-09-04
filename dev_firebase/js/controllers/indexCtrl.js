// 图片列表
angular.module('myControllers', []).controller("IndexCtrl", ['$scope', '$http',
function($scope, $http) {
	$scope.list = [{
		"title" : "建筑",
		"icon" : "../vision/photos/icon/5.jpg"
	}, {
		"title" : "人像",
		"icon" : "../vision/photos/icon/3.jpg"
	}, {
		"title" : "自然",
		"icon" : "../vision/photos/icon/1.jpg"
	}, {
		"title" : "风光",
		"icon" : "../vision/photos/icon/2.jpg"
	}, {
		"title" : "随写",
		"icon" : "../vision/photos/icon/4.jpg"
	}];

}]); 