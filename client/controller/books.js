
var myApp = angular.module('myApp');

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('BooksController loaded...');

	console.log('routeParams :' + $routeParams.id);

	//frong page for books
	$scope.getBooks = function(){ 
		$http.get('/api/books').then(function(response){
			$scope.books = response.data;
		});
	}

	//goes to a selected book
	$scope.getBook = function(){
		console.log('Inside getBook');
		var id = $routeParams.id;
		$http.get('/api/books/'+id).then(function(response){
			$scope.book = response.data;
		});
	}

	//adds a book to the list of books in the database
	$scope.addBook = function(){
		console.log("This is the $scope.book:" + $scope.book);
		$http.post('/api/books/', $scope.book).then(function(response){
			window.location.href='#/books';
		});
	}

	//updates a book in the database
	$scope.updateBook = function(){
		var id = $routeParams.id;
		$http.put('/api/books/'+id, $scope.book).then(function(response){
			window.location.href='#/books';
		});
	}

	//removes a book in the database
	$scope.removeBook = function(id){
		$http.delete('/api/books/'+id).then(function(response){
			window.location.href='#/books';
		});
	}
}]);