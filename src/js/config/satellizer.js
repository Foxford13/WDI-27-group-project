angular
.module('groupProject')
.config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  $authProvider.facebook({
    url: '/api/oauth/facebook',
    clientId: '193334994531585'
  });
}
