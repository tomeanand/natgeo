var natdirective = angular.module('natgeo.directive', ['ionic']);

natdirective.directive('optionsPanel', function()	{
	return {  
    restrict:'E',
    templateUrl:'templates/opion_text.html'
  };
});