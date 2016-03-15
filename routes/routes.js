var express = require('express');
var router = express.Router(); // Router with a capital 'R' is a mini-application
require('dotenv').load();
var mongo = require('monk');
// var db = mongo('localhost/movies');
var db = mongo(process.env.MONGOLAB_URI || 'localhost/movies');
// var db = require('monk')('localhost/movies');
var Movies = db.get('movies');

// router.get('/', function(requestuest, response){
//   response.render('home');
// });
//
// router.get('/about', function(requestuest, response){
//   response.render('about');
// });

router.get('/movies/', function(request, response) { // INDEX
  Movies.find({}, function(error, movies) {
    if (error) {
      response.send(error);
    }
    response.status(200).json(movies);
  })
});

router.post('/movies/', function(request, response) { // CREATE
  Movies.insert(request.body, function(error, movie) {
    if (error) {
      response.send(error);
    }
    response.status(201).json(movie)
  })
});

router.get('/movies/:id/edit', function(request, response) { // EDIT
  Movies.findOne({_id: request.params.id}, function(error, movie){
    if (error) {
      response.send(error);
    }
    response.status(200).json(movie);
  })
});

router.get('/movies/:id', function(request, response) { // SHOW
  Movies.findOne({_id: request.params.id}, function(error, movie){
    if (error) {
      response.send(error);
    }
    response.status(200).json(movie);
  })
});

router.put('/movies/:id', function(request, response) { // UPDATE
  Movies.findAndModify({_id: request.params.id}, request.body, function(error, movie){
    if (error) {
      throw error;
    }
    response.json(request.body);
  })
});

router.delete('/movies/:id', function(request, response) { // DESTROY
  Movies.remove({_id: request.params.id}, function(error, movie){
    if (error) {
      throw error;
    }
    response.status(204).json(movie);
  })
})

module.exports = router;
