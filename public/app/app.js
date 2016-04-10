(function() {
    //var app = //apparently this is the incorrect old method 
    angular.module('TFLN', [])
	.controller('TFLNController', [ '$http', function($http){
	    that = this;
	    this.TFLN = [];//textsFromLastNight;
	    $http.get('./tfln.json').success(function(data){
		that.TFLN = data;
	    });     
	}])
	.directive('individualText',function() {
	    return {
		restrict:'E',
		templateUrl:'./app/views/individual-text.html',
		/*controller: function(){},
		  controllerAs:'individualText'*/
	    }
	});
    var textsFromLastNight = [
	{"area_code":"1",
	 "text":"e"},
	{"area_code":"2",
	 "text":"d"},
	{"area_code":"3",
	 "text":"c"},
	{"area_code":"4",
	 "text":"b"},
	{"area_code":"5",
	 "text":"a"}
    ]
}());
