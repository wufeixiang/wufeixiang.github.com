'use strict';

angular.module('myControllers').controller('ExploreCtrl', ['$scope', '$http',
function($scope, $http) {
	$scope.list = [];
	$scope.loadData = function() {
		var url = _GLOBAL.api +  '/getRoomCover/';
		$http.get(url).success(function(ret) {
			var data = ret.data;
			var status = ret.status;
			if (data != null && status == 1) {
				$scope.list =  data;
			}
		});
	}

	$scope.loadData();
}]);
