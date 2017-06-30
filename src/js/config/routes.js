angular
.module('groupProject')
.config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('postsIndex', {
    url: '/',
    templateUrl: 'js/views/index.html',
    controller: 'PostsIndexCtrl as postsIndex'
  })
  .state('postsNew', {
    url: '/posts/new',
    templateUrl: 'js/views/new.html',
    controller: 'PostsNewCtrl as postsNew'
  })
  .state('postsEdit', {
    url: '/posts/:id/edit',
    templateUrl: 'js/views/edit.html',
    controller: 'PostsEditCtrl as postsEdit'
  })
  .state('postsShow', {
    url: '/posts/:id',
    templateUrl: 'js/views/show.html',
    controller: 'PostsShowCtrl as postsShow'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'js/views/auth/login.html',
    controller: 'LoginCtrl as login'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'js/views/auth/register.html',
    controller: 'RegisterCtrl as register'
  });


  $urlRouterProvider.otherwise('/');

}
