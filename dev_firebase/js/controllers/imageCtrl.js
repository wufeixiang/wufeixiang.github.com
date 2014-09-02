// 图片列表
angular.module('myApp', []).controller("imageCtrl", ['$scope', '$http',
	function($scope, $http) {
		$scope.list = [];
		
		$scope.loadData = function() {
			var url = _GLOBAL.api + '/getRoomCover/';
			$http.get(url).success(function(ret) {
				var data = ret.data;
				var status = ret.status;
				if (data != null && status == 1) {
					$scope.list = data;
				}
			});
		}
		
        $scope.$on('stateChangeSuccess', function() {
            $scope.loadMore();
        });
        $scope.loadMore = function() {
            $scope.loadData();
        }

        $scope.hasMoreData = true;
        $scope.moreDataCanBeLoaded = function() {
            return $scope.hasMoreData;
        }

	}
]);