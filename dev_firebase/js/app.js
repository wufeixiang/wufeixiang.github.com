// 定义全局的用户信息， 这里从后台获取
var _GLOBAL = {
	"firebase" : "https://icup.firebaseio.com/"
};
angular.module('myApp', ['myControllers']).config(function($httpProvider) {
	$httpProvider.defaults.transformRequest = function(obj) {
		var str = [];
		for (var p in obj)  {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
		return str.join("&");
	};
	$httpProvider.defaults.headers.post = {
		'Content-Type' : 'application/x-www-form-urlencoded'
	};
}).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('tabs.index', {
		url : "/index",
		templateUrl : "resource/views/index.html",
		controller : 'IndexCtrl'

	}).state('tabs.imageDetail', {
		url : "/imageDetail/:id",
		templateUrl : "resource/views/indexDetail.html",
		controller : 'IndexDetailCtrl'

	});
	$urlRouterProvider.otherwise("/index");
});

