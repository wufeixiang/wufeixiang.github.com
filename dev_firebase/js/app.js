// 定义全局的用户信息， 这里从后台获取
var _GLOBAL = {
	"firebase": "https://icup.firebaseio.com/"
};
angular.module('myApp', ["firebase",'ui.router', 'myControllers']).config(function($httpProvider) {
	$httpProvider.defaults.transformRequest = function(obj) {
		var str = [];
		for (var p in obj) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
		return str.join("&");
	};
	$httpProvider.defaults.headers.post = {
		'Content-Type': 'application/x-www-form-urlencoded'
	};
}).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('index', {
		url: "/index",
		templateUrl: "views/index.html",
		controller: 'IndexCtrl'
	}).state('imageDetail', {
		url: "/imageDetail/:title",
		templateUrl: "views/imageDetail.html",
		controller: 'ImageDetailCtrl'

	}).state('web', {
		url: "/web",
		templateUrl: "views/web.html",
		controller: 'WebCtrl'

	});
	$urlRouterProvider.otherwise("/index");
});