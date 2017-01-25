'use strict';

/* Controllers */

function IndexCtrl($scope, $http, $location) {
    var originalAllPosts;
    var allPosts = [];
    // 获取数据
    $scope.posts = [];
    $http.get('/api/posts')
        .then(function(data, status, headers, config) {
            originalAllPosts = data.data.posts;
            allPosts = originalAllPosts.filter(() => true);
            $scope.paginationConf.totalItems = allPosts.length;
            for (var i = 0; i < $scope.paginationConf.sizeOfEachPage && i < allPosts.length; ++i) {
                $scope.posts.push(allPosts[i]);
            }
        });

    // 获取用户信息,以此判断是否登录及是否是管理员
    $scope.status = {};
    $http.get('/api/status')
        .then(function(data) {
            $scope.status = data.data;
        });
    // 允许管理员对一个post进行隐藏或显示
    var index = 0;
    $scope.togglePost = function(post) {
        index = _.indexOf($scope.posts, post);
        $http.put('/togglePost', {
                id: post.id
            })
            .then(function(data) {
                if (data.data) $scope.posts[index].hidden = !$scope.posts[index].hidden;
            });
    };
    // filter
    $scope.filterBy = 'all';
    $scope.filterStr = '';
    $scope.postFilter = function() {
        if ($scope.filterStr === '') {
            allPosts = originalAllPosts.filter(() => true);
        } else {
            if (_.indexOf(['title', 'author', 'content', 'all'], $scope.filterBy) === -1 ) return;

            var re = new RegExp($scope.filterStr);
            allPosts = originalAllPosts.filter(function(x) {
                if ($scope.filterBy === 'all')
                    return re.test(x['title']) || re.test(x['author']) || re.test(x['content']);
                else
                    return re.test(x[$scope.filterBy]);
            });
        }
        $scope.paginationConf.totalItems = allPosts.length;
    };
    // 分页,使用了自定义指令<my-pagination conf="paginationConf"></my-pagination>
    $scope.paginationConf = {
        curPageIndex: 1,
        sizeOfEachPage: 5,
        totalItems: allPosts.length,
        reloadSource: function() {
            // 只关注于重新加载当前页面内容,无需理会分页条的变化,只与以上三个参数有关
            $scope.posts = [];
            var start = (this.curPageIndex - 1) * this.sizeOfEachPage;
            // js中的for循环中间的表达式如果多余一项一定要加上括号,否则满足后面的条件后会跳过前面的条件
            for (var i = start; (i < start + this.sizeOfEachPage && i < this.totalItems); ++i) {
                $scope.posts.push(allPosts[i]);
            }
        }
    }
}

function AddPostCtrl($scope, $http, $location) {
    $scope.form = {
        title: '',
        summary: '',
        category: 'none',
        content: ''
    };
    $scope.submitPost = function() {
        $http.post('/api/post', $scope.form)
            .then(function(data) {
                if (data.data) $location.path('/');
            });
    };

    $('form').submit(function() {});
}

function ReadPostCtrl($scope, $http, $location, $routeParams) {
    $http.get('/api/post/' + $routeParams.id)
        .then(function(data) {
            $scope.post = data.data.post;
        });

    $scope.status = {};
    $http.get('/api/status')
        .then(function(data) {
            $scope.status = data.data;
        });
    // add comment
    $scope.form = {
        content: ''
    };
    $scope.addComment = function() {
        if ($scope.form.content === '') return;
        if ($scope.status.user === '') {
            window.alert('请先登录!');
            return;
        }

        $http.post('/addComment', Object.assign($scope.form, {
                id: $routeParams.id
            }))
            .then(function(data) {
                $scope.post.comments.push(data.data);
                $scope.form.content = '';
            });
    };
    // edit comment
    $scope.editMode = false;
    var index = 0;
    $scope.editComment = function(event) {
        $scope.editMode = true;
        index = _.indexOf($(event.target.parent().parent().children()), $(event.target.parent()));
    };
    // update comment
    $scope.submitNewComment = function() {
        $scope.editMode = false;
        $http.post('/updateComment', Object.assign($scope.post.comments[index], {index: index}, {id: $routeParams.id}))
            .then(function(data) {});
    };
    // 允许管理员隐藏或者显示评论
    $scope.toggleComment = function(comment) {
        index = _.indexOf($scope.post.comments, comment);
        $http.put('/toggleComment', {
                id: $scope.post._id,
                index: index
            })
            .then(function(data) {
                if (data.data) $scope.post.comments[index].hidden = !$scope.post.comments[index].hidden;
            });
    };
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
    $scope.form = {
        category: 'none'
    };
    $http.get('/api/post/' + $routeParams.id)
        .then(function(data) {
            $scope.form = Object.assign($scope.form, data.data.post);
        });
    $scope.form['category'] = 'none';
    // submit and update the post
    $scope.editPost = function() {
        $http.put('/api/post/' + $routeParams.id, $scope.form)
            .then(function(data) {
                $location.path('/readPost/' + $routeParams.id);
            });
    };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
    $http.get('/api/post/' + $routeParams.id)
        .then(function(data) {
            $scope.post = data.data.post;
        });

    $scope.deletePost = function() {
        $http.delete('/api/post/' + $routeParams.id)
            .then(function(data) {
                $location.path('/');
            });
    };

    $scope.home = function() {
        $location.path('/');
    };
}

function SignUp($scope, $http, $location, $routeParams) {
    $scope.form = {
        username: '',
        password: '',
        password2: '',
        studentID: '',
        phone: '',
        email: ''
    };

    $scope.signup = function() {
        if (!_.every($('.help-block'), (x) => $(x).hasClass('hidden')) || $scope.form.password !== $scope.form.password2)
            return;
        $http.post('/signup', $scope.form)
            .then(function(data) {
                if (data.data) $location.path('/');
            });
    };

    // 表单验证,复用上次作业代码
    $('form').submit(function() {
        if (!_.every($('.help-block'), (x) => $(x).hasClass('hidden')) || $scope.form.password !== $scope.form.password2)
            return false;
    });

    var items = ['username', 'studentID', 'email', 'phone'];
    for (var item of items) {
        (function(item) {
            $('input#' + item).blur(function() {
                if ($(this).val() !== '') {
                    if (!validator[item]($(this).val())) checkFail(item);
                    else sentAjaxReq(item, $(this).val());
                } else {
                    clear(item);
                }
            });
        })(item);
    }
    $('input#password').blur(function() {
        clear('password');
        if ($(this).val() !== '') {
            if (!validator.password($(this).val())) checkFail('password');
            else success('password');
        }
        $('input#password2').blur();
    });
    $('input#password2').blur(function() {
        clear('password2');
        if ($(this).val() !== '') {
            if ($(this).val() !== $('input#password').val()) checkFail('password2');
            else success('password2');
        }
        $('input.password').blur();
    });

    function sentAjaxReq(item, data) {
        $.ajax('/ajax', {
            method: 'POST',
            data: {
                type: item,
                data: data
            }
        }).done(function(data) {
            if (data.startsWith('invalid'))
                repetition(data.substring(8));
            else
                success(data.substring(6));
        }).fail(function(xhr, status) {
            window.alert('失败: ' + xhr.status + ', 原因: ' + status);
        });
    }

    function clear(item) {
        $('label.' + item).parent().removeClass('has-success').removeClass('has-error').removeClass('has-feedback');
        $('span.' + item).removeClass('show').addClass('hidden');
        $('span.' + item + 'E').removeClass('show').addClass('hidden');
    }
    function success(item) {
        clear(item);
        $('label.' + item).parent().addClass('has-success').addClass('has-feedback');
        $('label.' + item).parent().children('.glyphicon-ok').removeClass('hidden').addClass('show');
    }
    function failDriver(item) {
        clear(item);
        $('label.' + item).parent().addClass('has-error').addClass('has-feedback');
        $('label.' + item).parent().children('.glyphicon-remove').removeClass('hidden').addClass('show');
    }
    function checkFail(item) {
        failDriver(item);
        $($('label.' + item).parent().children('.help-block')[0]).removeClass('hidden').addClass('show');
    }
    function repetition(item) {
        failDriver(item);
        $('span.' + item + 'E').removeClass('hidden').addClass('show');
    }
}

function SignIn($scope, $http, $location, $routeParams) {
    $scope.form = {
        username: '',
        password: ''
    };
    $scope.error = false;

    $scope.signin = function() {
        $http.post('/signin', $scope.form)
            .then(function(data) {
                if (data.data) $location.path('/');
                else $scope.error = true;
            });
    };
}

function SignOut($scope, $http, $location, $routeParams) {
    $http.get('/api/quit')
        .then(function(data) {
            if (data.data) $location.path('/');
        });
}

function AccountDetail($scope, $http, $location, $routeParams) {
    $http.get('/api/account/' + $routeParams.username)
        .then(function(data) {
            $scope.user = data.data.user;
        });
    $http.get('/api/posts/' + $routeParams.username)
        .then(function(data) {
            $scope.posts = data.data.posts;
        });
}
