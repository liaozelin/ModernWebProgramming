'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'myPagination']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: IndexCtrl
      }).
      when('/addPost', {
        templateUrl: 'partials/addPost.html',
        controller: AddPostCtrl
      }).
      when('/readPost/:id', {
        templateUrl: 'partials/readPost.html',
        controller: ReadPostCtrl
      }).
      when('/editPost/:id', {
        templateUrl: 'partials/editPost.html',
        controller: EditPostCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost.html',
        controller: DeletePostCtrl
      }).
      when('/signUp', {
        templateUrl: 'partials/signup.html',
        controller: SignUp
      }).
      when('/signIn', {
        templateUrl: 'partials/signin.html',
        controller: SignIn
      }).
      when('/signOut', {
        templateUrl: 'partials/signout.html',
        controller: SignOut
      }).
      when('/account/:username', {
        templateUrl: 'partials/accountDetail.html',
        controller: AccountDetail
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
