(function() {
    //var app = //apparently this is the incorrect old method 
    angular.module('TFLN', [])
	.controller('TFLNController', [ '$http','$scope', function($http,$scope){
	    that = this;
	    this.TFLN = [];//textsFromLastNight;
	    $http.get('./api/texts/list' /*'tfln.json'*/).success(function(data){
		that.TFLN = data;
	    });
	    $scope.$on('eventName', function (event, args) {
		$scope.message = args.message;
		console.log($scope.message);
	    });
	    $scope.$on('uploadText',function(event,args){
		console.log('uploadText', args);
		$http.post('./api/text',args).success(function(data){
		    console.log(data);
		});
	    });
	    $scope.$on('downvote',function(event,args){
		console.log('downvote');
		$http.put('./api/text/downvote/'+args.id).success(function(data){
		});
	    });
	    $scope.$on('upvote',function(event,args){
		console.log('upvote');
		$http.put('./api/text/upvote/'+args.id).success(function(data){
		});
	    });
	    $scope.$on('sortByUpvote',function(event,args){
		$http.get('./api/texts/sortMostUpvoted').success(function(data) {
		    that.TFLN = data;
		});
	    });
	    $scope.$on('sortByDownvote',function(event,args){
		$http.get('./api/texts/sortMostDownvoted').success(function(data) {
		    that.TFLN = data;
		});
	    });
	}])
	.directive('individualText',function() {
	    return {
		restrict:'E',
		templateUrl:'./app/views/individual-text.html',
		controller: function($scope){
		    this.upvote = function(id) {
			console.log('uv called');
			$scope.$emit('upvote',{id:id});
			console.log("TODO: we also then need to show the upvote in the view");
		    };
		    this.downvote = function(id) {
			console.log('dv called');
			$scope.$emit('downvote',{id:id});
		    };
		},
		controllerAs:'individualText' //name in view must match this.
	    }
	})
	.directive('emitter', function(){
	    return {
		restrict: 'E',
		templateUrl:'./app/views/emitter.html',
		controller: function($scope){
		    this.msg = '';
		    this.handleClick = function () {
			console.log("handleClick");
			$scope.$emit('eventName',{message: this.msg});
		    };
		},
		controllerAs: 'emitter'
	    }
	})
	.directive('sendMessage', function(){
	    return {
		restrict: 'E',
		templateUrl:'./app/views/send-message.html',
		controller: function(/*$scope*/){
//		    this.msg = '';
		    this.handleClick = function (msg) {
			console.log("sendMessage:"+msg+' '+this.myMsg); //thought myMsg was autocreated and added to the model
			//$scope.$emit('eventName',{message: this.msg});
		    };
		},
		controllerAs: 'sendMessage'
	    }
	})
	.directive('testClick', function() {
	    return {
		restrict: 'E',
		//		templateUrl:'./app/views/emitter.html',
		templateUrl:'./app/views/click.html',
		controller: function() {
		    this.testClick = function() {
			console.log('test click');
		    };
		},
		controllerAs: 'tC'
	    }
	})
	.directive('sortByUpvotes', function() {
	    return {
		restrict: 'E',
		templateUrl: './app/views/sort-by-upvotes.html',
		controller: function($scope){
		    this.getUpvotes = function() {
			$scope.$emit('sortByUpvote',{});
		    }
		},
		controllerAs: 'upvote'
	    }
	})
	.directive('sortByDownvotes', function() {
	    return {
		restrict: 'E',
		templateUrl: './app/views/sort-by-downvotes.html',
		controller: function($scope){
		    this.getDownvotes = function() {
			$scope.$emit('sortByDownvote',{});
		    }
		},
		controllerAs: 'downvote' //TODO: standardize the directive name, the controllerAs name and the templateUrl filename. Should the dirctive and the controller be named the same thing?
	    }
	})
	.directive('uploadText',function() {
	    return {
		restrict: 'E',
		templateUrl: './app/views/upload-text.html',
		controller: function($scope) {
		    this.showForm = true;//false;
		    this.showHideFormText = "Hide";//"Show";
		    this.text = { "Area Code": 0, Text: '' };
		    
		    this.showFormHandler = function() {
			this.showForm = !this.showForm;
			this.showForm === false ? this.showHideFormText = "Show" : this.showHideFormText = "Hide";
		    };
		    this.clearForm = function() {
			this.text = { "Area Code": 0, Text: '' };
		    };
		    this.uploadText = function() {
			$scope.$emit('uploadText', this.text);
			this.clearForm();
		    };
		},
		controllerAs: 'uploadText'
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
