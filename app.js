const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var app = express();

app.use(express.static(__dirname+ '/client'));

//middle ware to use body parser
app.use(bodyParser.json());
 
//included genres files
Genre = require('./models/genre');
Book = require('./models/book');
// Connect to Mongoose
mongoose.connect('mongodb://localhost/Bookstore').then(()=>{},err=>{console.log("Error connecting to database");});
var db = mongoose.connection;

app.get('/', (req, res)=>{

	res.send("Please Use2 /api/books or /api/genres");

});


//gets generes
app.get('/api/genres', (req, res)=>{
	
	Genre.getGenres((err, genres)=>{
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

//post to api generes
app.post('/api/genres', (req, res)=>{
	
	var genre = req.body;

	Genre.addGenre(genre, (err, genre)=>{
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

//update api generes
app.put('/api/genres/:_id', (req, res)=>{
	var id = req.params._id;
	var genre = req.body;

	Genre.updateGenre(id, genre, {}, (err, genre)=>{
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

//delete genre
app.delete('/api/genres/:_id', (req, res)=>{
	var id = req.params._id;
	Genre.deleteGenre(id, (err, genre)=>{
		if(err){
			throw err;
		}
		res.json(genre);
	});
});


//gets books
app.get('/api/books', (req, res)=>{
	
	Book.getBooks((err, books)=>{
		if(err){
			throw err;
		}
		res.json(books);
	});
});

//gets books by id
app.get('/api/books/:_id', (req, res)=>{
	Book.getBookById(req.params._id, (err, book)=>{
		if(err){
			throw err;
		}
		res.json(book);
	});
});


//post to api books 
app.post('/api/books', (req, res)=>{
	var book = req.body;
	Book.addBook(book, (err, book)=>{
		if(err){
			throw err;
		}
		res.json(book);
	});
});

//update api books
app.put('/api/books/:_id', (req, res)=>{
	var id = req.params._id;
	var book = req.body;

	Book.updateBook(id, book, {}, (err, genre)=>{
		if(err){
			throw err;
		}
		res.json(book);
	});
});

//delete genre
app.delete('/api/books/:_id', (req, res)=>{
	var id = req.params._id;
	Book.deleteBook(id, (err, book)=>{
		if(err){
			throw err;
		}
		res.json(book);
	});
});




app.listen(3000);

console.log("Running on port 3000");