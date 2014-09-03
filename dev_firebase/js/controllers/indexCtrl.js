// 图片列表
angular.module('myControllers', []).controller("indexCtrl", ['$scope', '$http',
function($scope, $http) {
	$scope.list = [{
		"vision" : "建筑",
		"icon" : "vision/photos/icon/5.jpg"
	}, {
		"vision" : "人像",
		"icon" : "vision/photos/icon/3.jpg"
	}, {
		"vision" : "自然",
		"icon" : "vision/photos/icon/1.jpg"
	}, {
		"vision" : "风光",
		"icon" : "vision/photos/icon/2.jpg"
	}, {
		"vision" : "随写",
		"icon" : "vision/photos/icon/4.jpg"
	}];

}]); 