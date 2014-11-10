	var qunum = 0;
	var qlist = shuffleArray ($rootScope.qlist);

	$scope.questionList =  shuffleArray ($rootScope.qlist);

	$scope.item = qlist[qunum];
	$scope.isImage = qlist[qunum].type == 1 ? true : false;
	$scope.answer = ''
	

	$scope.nextq = function()	{

		//console.log(qlist[qunum]);
		$('input[name=group]').attr('checked',false);
		if(qunum >= qlist.length-1)	{
			qunum=0;
			$rootScope.qlist = qlist;
			$state.go('result');

		}
		else	{
			qunum++
		}
		$scope.isImage = qlist[qunum].type == 1 ? true : false;
		$scope.item = qlist[qunum];
	}
	$scope.checkQtype = function(type)	{
		var isShow = (type == '1' ? true : false);
		console.log(isShow)
		return isShow;
	}
	$scope.selectHandeler = function(event)	{
		qlist[qunum]['user_answer'] = event;

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