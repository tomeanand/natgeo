var natcontroller = angular.module('natgeo.controllers', ['ngAnimate','ngResource']);

natcontroller.controller('HomeController', function($scope,  $state) {
	
	$scope.gotoLogin = function()	{
		 $state.go('login');
	}
	
});

natcontroller.controller('ResultController', function($scope, $state,$rootScope, $http, QuestionList,QuizContest)	{
		$scope.score = QuestionList.score;
		var dataObj = {
			name:QuestionList.user.name
			,email:QuestionList.user.email
			,phone:QuestionList.user.phone
			,attempted:QuestionList.score.attempted
			,scored:QuestionList.score.score}
			var queryString = '?email='+dataObj.email+'&name='+dataObj.name+'&phone='+dataObj.phone+'&attempted='+dataObj.attempted+'&scored='+dataObj.scored
			$http({url:'http://bakasur.mxbit.co.in/index.php/api/menu/score'+queryString
				,method:'GET'
				,data:dataObj
			})
			.success(function(res){console.log("Success")})
			.error(function(err){console.log("Error")})

			//$resource( 'http://localhost/bakasurserver/index.php/api/menu/all', {}, { getMenu: {method:'GET',isArray:true} });

			// var query = "INSERT INTO natgeo_contestant (name,email.phone,attempted,scored) VALUES (?,?)";
			// $cordovaSQLite.execute($rootScope.db, query, ["test", 100]).then(function(res) {
			// 	console.log("insertId: " + res.insertId);
			// }, function (err) {
			// 	console.error(err);
			// });

		//QuizContest.save(dataObj);
		//QuizContest.query(function(data) { alert(data)});

		


		$scope.goHome = function()	{
		 $state.go('home');
	}
});
natcontroller.controller('LoginController', function($scope, $state, QuestionList)	{
	$scope.showError = false;
	$scope.user = {}
	$scope.gotoQuestion = function()	{
		 $state.go('quiz');
		 QuestionList.user = $scope.user
		 
	}

})



natcontroller.controller('QuizController', function($scope,$rootScope,$state,$ionicSlideBoxDelegate, QuestionList)	{
	var qunum = 0;
	var qlist =  shuffleArray($rootScope.qlist).slice(0,10);
	$scope.questionList =  qlist
	$scope.isImage = false;

	$scope.answer = ''
	$scope.isFinal = false;
	$scope.colmn = 'col-25'
	$scope.isSelected = false;


	
  $scope.nextSlide = function() {
  	if($scope.isSelected)
  	if($scope.isFinal)	{
  		QuestionList.answerList = $scope.questionList;
		
		var answers = QuestionList.answerList;
		var scoreInfo = {score:0, total:answers.length, attempted:0};

		angular.forEach(answers, function(value, key) {
			if(value.user_answer)	{
				scoreInfo.attempted ++;
				if(value.user_answer == value.answer)	{
					scoreInfo.score++;
				}
			}
		  
		});
		QuestionList.score = scoreInfo;
		

  		$state.go('result');
  	}
  	else	{
		$ionicSlideBoxDelegate.next();

  	}
  }
  $scope.slideHasChanged = function(index)	{
  	$scope.isSelected = false;
  	qunum = index;
 	$scope.isFinal = qunum == (qlist.length-1) ? true : false;
  }
	$scope.checkQtype = function(type,i)	{		
		var isShow = (type  == '1' ? (arguments[2] == "h" ? true : true) : false);
		return isShow;
	}
	$scope.setLayout = function()	{
		return (arguments[0] == "h" ? true : false)
	}
	$scope.getImage = function(options)	{
		if(options.indexOf("png")>=0 || options.indexOf("jpg")>=0)	{
			return options;
		}
		else	{
			return "";
		}
		
	}	
	$scope.selectHandeler = function(event)	{
		$scope.isSelected = true;
		qlist[qunum]['user_answer'] = event;
	}
	$scope.getColoumn = function(count)	{
		var result =  count >4 ? 'col-20' : 'col-25';
		console.log(result)
		return result;
	}

	function  shuffleArray (array) {
		var m = array.length, t, i;
		while (m) {
			i = Math.floor(Math.random() * m--);
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
		return array;
	}



});