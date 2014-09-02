// 定义全局的用户信息， 这里从后台获取
var _GLOBAL = {
	"api" : "http://m.yfway.com/MobileAPI/?s=/Mapi"
};
angular.module('myApp', ['ionic', 'myControllers', 'myFilters']).config(function($httpProvider) {
	$httpProvider.defaults.transformRequest = function(obj) {
		var str = [];
		for (var p in obj) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
		return str.join("&");
	}
	$httpProvider.defaults.headers.post = {
		'Content-Type' : 'application/x-www-form-urlencoded'
	}
}).config(function($stateProvider, $urlRouterProvider) {
	//这里是根url
	$stateProvider.state('tabs', {
		url : "/tab",
		abstract : true,
		templateUrl : "resource/views/tabs.html"
	}).state('tabs.index', {
		url : "/index",
		views : {
			'tab-index' : {
				templateUrl : "resource/views/index.html",
				controller : 'IndexCtrl'
			}
		}
	}).state('tabs.indexDetail', {
		url : "/indexDetail/:CloudID",
		views : {
			'tab-index' : {
				templateUrl : "resource/views/indexDetail.html",
				controller : 'IndexDetailCtrl'
			}
		}
	}).state('tabs.explore', {
		url : "/explore",
		views : {
			'tab-explore' : {
				templateUrl : "resource/views/explore.html",
				controller : 'ExploreCtrl'
			}
		}
	}).state('tabs.exploreList', {
		url : "/exploreList/:type",
		views : {
			'tab-explore' : {
				templateUrl : "resource/views/exploreList.html",
				controller : 'ExploreListCtrl'
			}
		}
	}).state('tabs.exploreDetail', {
		url : "/exploreDetail/:type",
		views : {
			'tab-explore' : {
				templateUrl : "resource/views/exploreDetail.html",
				controller : 'ExploreDetailCtrl'
			}
		}
	}).state('tabs.level', {
		url : "/level",
		views : {
			'tab-level' : {
				templateUrl : "resource/views/level.html",
				controller : 'LevelCtrl'
			}
		}
	}).state('tabs.my', {
		url : "/my",
		views : {
			'tab-my' : {
				templateUrl : "resource/views/my.html",
				controller : 'MyCtrl'
			}
		}
	}).state('tabs.mySetting', {
		url : "/mySetting",
		views : {
			'tab-my' : {
				templateUrl : "resource/views/mySetting.html",
				controller : 'MySettingCtrl'
			}
		}
	}).state('tabs.user', {
		url : "/user/:username",
		templateUrl : "resource/views/user.html",
		controller : 'UserCtrl'
	}).state('tabs.myStar', {
		url : "/myStar",
		views : {
			'tab-my' : {
				templateUrl : "resource/views/myStar.html",
				controller : 'MyStarCtrl'
			}
		}
	}).state('tabs.myFavor', {
		url : "/myFavor",
		views : {
			'tab-my' : {
				templateUrl : "resource/views/myFavor.html",
				controller : 'MyFavorCtrl'
			}
		}
	}).state('tabs.myResource', {
		url : "/myResource",
		views : {
			'tab-my' : {
				templateUrl : "resource/views/myResource.html",
				controller : 'MyResourceCtrl'
			}
		}
	}).state('tabs.myResourceDetail', {
		url : "/myResourceDetail/:cid",
		views : {
			'tab-my' : {
				templateUrl : "resource/views/myResourceDetail.html",
				controller : 'MyResourceDetailCtrl'
			}
		}
	}).state('tabs.myMessage', {
		url : "/myMessage",
		views : {
			'tab-my' : {
				templateUrl : "resource/views/myMessage.html",
				controller : 'MyMessageCtrl'
			}
		}
	}).state('tabs.myComments', {
		url : "/myComments",
		views : {
			'tab-my' : {
				templateUrl : "resource/views/myComments.html",
				controller : 'MyCommentsCtrl'
			}
		}
	}).state('tabs.feed', {
		url : "/feed",
		views : {
			'tab-my' : {
				templateUrl : "resource/views/feed.html",
				controller : 'FeedCtrl'
			}
		}
	}).state('tabs.about', {
		url : "/about",
		views : {
			'tab-my' : {
				templateUrl : "resource/views/about.html",
				controller : 'AboutCtrl'
			}
		}
	});

	$urlRouterProvider.otherwise("/tab/my");

});
