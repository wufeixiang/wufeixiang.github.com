'use strict';

/**
 * 推荐首页
 */
angular.module('myControllers', []).controller('IndexCtrl', ['$scope', '$http',
    function($scope, $http) {
        // 初始化的时候加载当天的
        $scope.day = date2str(new Date(),"yyyyMMdd");
        $scope.list = [];

        $scope.loadData = function() {
            var url = _GLOBAL.api + '/getPlansByDay/day/' + $scope.day;
            $http.get(url).success(function(ret) {
                var status = ret.status;
                if (status == 1) {
                    var data = ret.data;
                    $scope.list.push.apply($scope.list, data);
                    
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                } else {
                    $scope.hasMoreData = false;
                }
            });

            var pre_url = _GLOBAL.api + '/getPlansPreviousDay/day/' + $scope.day;
            $http.get(pre_url).success(function(ret) {
                if (ret.status == 1) {
                    var data = ret.data;
                    var previous_day = data.previous;
                    $scope.day = previous_day;
                } else {
                    $scope.hasMoreData = false;
                }
            });
        }
        // $scope.loadData();

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
    }]);
