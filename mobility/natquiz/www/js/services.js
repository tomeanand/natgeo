var bakasurService = angular.module('natgeo.services', ['ngResource']);

bakasurService.factory('QuestionList', function($http, $rootScope) {
	var questionList = [];
	var score = {score:0,total:0,attempted:0};
	var user = {name:'',email:'',phone:''}

	$http.get('data/questions.json').then(function(result){
	 	questionList = result;

		angular.forEach(result.data, function(value, key) {
			
		
	});console.log(result.data);

	 	$rootScope.qlist = result.data;
	});

	return { qlist:questionList };
});


bakasurService.factory("Contestant", function ($resource) {
    return $resource(
        "http://localhost/bakasurserver/index.php/api/menu/all",
        {Id: "@Id" },
        {
            "update": {method: "PUT"},
            "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
        }
    );
});

bakasurService.factory("QuizContest", function($resource) {
  return $resource("http://bakasur.mxbit.co.in/index.php/api/menu/all");
});