// 定义全局的用户信息， 这里从后台获取
var _GLOBAL = {
	"firebase": "https://icup.firebaseio.com/"
};
angular.module('myApp', ['myControllers', 'myFilters']).config(function($httpProvider) {
$httpProvider.defaults.transformRequest = function(obj) {
	var str = [];
	for (var p in obj) {
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	}
	return str.join("&");
}
$httpProvider.defaults.headers.post = {
	'Content-Type': 'application/x-www-form-urlencoded'
}
}).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('tabs.index', {
		url: "/index",
		views: {
			'tab-index': {
				templateUrl: "resource/views/index.html",
				controller: 'IndexCtrl'
			}
		}
	}).state('tabs.imageDetail', {
			url: "/imageDetail/:id",
			templateUrl: "resource/views/indexDetail.html",
			controller: 'IndexDetailCtrl'
		}

	})

$urlRouterProvider.otherwise("/tab/index");

});

// 时间格式化函数 yyyyMMdd hhmmss
function date2str(x, y) {
	var z = {
		M: x.getMonth() + 1,
		d: x.getDate(),
		h: x.getHours(),
		m: x.getMinutes(),
		s: x.getSeconds()
	};
	y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
		return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
	});
	return y.replace(/(y+)/g, function(v) {
		return x.getFullYear().toString().slice(-v.length)
	})
}