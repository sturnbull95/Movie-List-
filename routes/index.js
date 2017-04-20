var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

router.get('/', function(req, res) {
  res.redirect('/movies');
});

router.get('/api/movies', function(req, res) {
    var movieFilter = {},
      searchExists = false;

    if(req.query.director) {
      movieFilter.director = req.query.director;
      searchExists = true;
    }

    Movie.find(movieFilter, function(err, movies, count) {
      res.json(movies);
  });

});

router.get('/main.js', function(req,res){
  res.sendFile(__dirname + '/main.js');
});
router.get('/movies', function(req, res) {
  var movieFilter = {},
    searchExists = false;

  if(req.query.director) {
    movieFilter.director = req.query.director;
    searchExists = true;
  }

  Movie.find(movieFilter,{title: 1, director: 1, year: 1}, function(err, movies, count) {
    console.log(movies);
    res.render('movies', {'movies': movies, searchExists: searchExists, director: req.query.director });
  });
});

router.post('/api/movies/create', function(req, res) {
  var bool = {true:true};
  (new Movie({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year
  })).save(function(err, movie, count) {
    res.json(bool);
  });
});

router.get('/movies/create', function(req, res) {
  res.render('movies-create', {});
});

module.exports = router;
