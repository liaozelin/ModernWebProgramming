// AngularJs如何自定义指令?
// https://github.com/nixzhu/dev-blog/blob/master/2014-05-03-creating-custom-angularjs-directives-part-1-the-fundamentals.md
// http://www.cnblogs.com/powertoolsteam/p/angularjs-custom-directive.html

(function() {
    // 自定义指令实现分页
    var directive = function() {
        return {
            restrict: 'EA',
            templateUrl: 'partials/myPagination.html',
            replace: true,
            scope: {
                conf: '=',
            },
            // $scope.conf = {
            //     curPageIndex: 1,
            //     sizeOfEachPage: 2,
            //     totalItems: allPosts.length,
            //     reloadSource: function() {...}
            // };
            // 传入的参数只需包括curPageIndex,sizeOfEachPage,totalItems三个变量,其他分页需要的变量
            // 如$scope.pagesList,conf.$scope.pagesSize均可计算得到,在指令内部声明即可
            // 本指令只关注于分页条的变化,不考虑页面数据的加载问题,因此用户需自定义一个加载页面的函数(该函数根据以上三个变量加载数据)并传入
            link: function($scope, element, attrs) {
                var conf = $scope.conf;

                $scope.pagesList = [];
                $scope.pagesSize = Math.ceil(conf.totalItems / conf.sizeOfEachPage);
                $scope.sizeOfEachPageOptions = [1, 2, 5, 10, 20];

                var old_curPageIndex = conf.curPageIndex;

                // init
                resetPagination();
                if (conf.reloadSource) conf.reloadSource();

                // 重新设置$scope.pagesList,即分页条的显示
                // 当前页前后最多有3个页面选项
                function resetPagination() {
                    if (old_curPageIndex - conf.curPageIndex === 1) {
                        if (conf.curPageIndex < $scope.pagesSize - 3) $scope.pagesList.pop();
                        if ($scope.pagesList[0] > 1) {
                            $scope.pagesList.unshift($scope.pagesList[0] - 1);
                        }
                    } else if (old_curPageIndex - conf.curPageIndex === -1) {
                        if (conf.curPageIndex > 4) $scope.pagesList.shift();
                        if ($scope.pagesList[$scope.pagesList.length - 1] < $scope.pagesSize) {
                            $scope.pagesList.push($scope.pagesList[$scope.pagesList.length - 1] + 1);
                        }
                    } else if (old_curPageIndex === conf.curPageIndex) {
                        var end = $scope.pagesSize > 5 ? 5 : $scope.pagesSize + 1;
                        $scope.pagesList = _.range(1, end);
                    } else {
                        var start = conf.curPageIndex - 3 > 1 ? conf.curPageIndex - 3 : 1;
                        var end = conf.curPageIndex + 3 < $scope.pagesSize ? conf.curPageIndex + 3 : $scope.pagesSize;
                        $scope.pagesList = _.range(start, end + 1);
                    }
                }

                $scope.setPage = function(inx) {
                    if (inx > $scope.pagesSize || inx < 1) return;
                    old_curPageIndex = conf.curPageIndex;
                    conf.curPageIndex = inx;

                    resetPagination();
                    if (conf.reloadSource) conf.reloadSource();
                }

                $scope.previousPage = function() {
                    if (conf.curPageIndex > 1) {
                        old_curPageIndex = conf.curPageIndex;
                        conf.curPageIndex--;

                        resetPagination();
                        if (conf.reloadSource) conf.reloadSource();
                    }
                }

                $scope.nextPage = function() {
                    if (conf.curPageIndex < $scope.pagesSize) {
                        old_curPageIndex = conf.curPageIndex;
                        conf.curPageIndex++;

                        resetPagination();
                        if (conf.reloadSource) conf.reloadSource();
                    }
                }

                $scope.changeSizeOfEachPage = function() {
                    conf.curPageIndex = 1;
                    old_curPageIndex = conf.curPageIndex;

                    $scope.pagesSize = Math.ceil(conf.totalItems / conf.sizeOfEachPage);

                    resetPagination();
                    if (conf.reloadSource) conf.reloadSource();
                }

                $scope.$watch('conf.totalItems', function(newValue, oldValue) {
                    conf.curPageIndex = 1;
                    $scope.pagesSize = Math.ceil(conf.totalItems / conf.sizeOfEachPage);

                    resetPagination();
                    if (conf.reloadSource) conf.reloadSource();
                });
            }
        };
    };

    angular.module('myPagination', [])
        .directive('myPagination', directive);
})();
