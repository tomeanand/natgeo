// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var natgeo_app = angular.module('natgeo', ['ionic','natgeo.controllers','natgeo.services']);

natgeo_app.run(function($ionicPlatform, $state, $rootScope, QuestionList) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    $state.go('home');
    $rootScope.questions = (QuestionList.qlist);
   
    // var query = 'CREATE TABLE IF NOT EXISTS natgeo_contestant (id integer primary key, name text, email text, phone text, attempted integer, scored integer)';
    // $rootScope.db = $cordovaSQLite.openDB({ name: "natgeo.db" });
    // $cordovaSQLite.execute($rootScope.db, query, []).then(function(data){
    //               console.log(data);
    //               });
  });
})


natgeo_app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider

    .state('home', { url: "/app/home",  templateUrl: "templates/home.html", controller: 'HomeController' })
    .state('login', { url: "/app/login",  templateUrl: "templates/login.html", controller: 'LoginController' })
    .state('quiz', { url: "/app/quiz",  templateUrl: "templates/quiz.html", controller: 'QuizController' })
    .state('result', { url: "/app/result",  templateUrl: "templates/result.html", controller: 'ResultController' })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

console.log($httpProvider);
$httpProvider.defaults.useXDomain = true;
delete $httpProvider.defaults.headers.common['X-Requested-With'];

$httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

});
