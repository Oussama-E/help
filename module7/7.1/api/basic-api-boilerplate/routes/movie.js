var express = require('express');
const {
  readAllMovies,
  readOneMovie,
  createOneMovie,
  deleteOneMovie,
  updateOneMovie,
} = require('../models/movies');
const { authorize, isAdmin } = require('../utils/auths');
var router = express.Router();

/* GET home page. */
/* Read all the movies from the MOVIES
   GET /movies?order=title : ascending order by title
   GET /movies?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
  console.log('GET /movies');
  const allMoviesPotentiallyOrdered = readAllMovies(req?.query);
  return res.json(allMoviesPotentiallyOrdered);
});

// Read the movies identified by an id in the MOVIES
router.get('/:id', (req, res) => {
  console.log(`GET /movies/${req.params.id}`);
  const foundMovie = readOneMovie(req.params.id);
  if (!foundMovie) {
    return res.sendStatus(404);
  }
  return res.json(foundMovie);
});

// Create a movie to be added to the MOVIES.
router.post('/', authorize, (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /movies');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const movieCreated = createOneMovie(title, duration, budget, link);
  return res.json(movieCreated);
});

// Delete a movie from the movies based on its id
router.delete('/:id', authorize, (req, res) => {
  console.log(`DELETE /movies/${req.params.id}`);
  const movieDeleted = deleteOneMovie(req.params.id);
  if (!movieDeleted) {
    return res.sendStatus(404);
  }
  return res.json(movieDeleted);
});

// Update a movie based on its id and new values for its parameters
router.patch('/:id', authorize, (req, res) => {
  console.log(`PATCH /movies/${req.params.id}`);
  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;
  console.log('title = ', title);
  console.log('duration = ', duration);
  console.log('budget = ', budget);
  console.log('link = ', link);

  if (
    (!title && !duration && !budget && !link) ||
    title?.length === 0 ||
    duration?.length === 0 ||
    budget?.length === 0 ||
    link?.length === 0
  ) {
    return res.sendStatus(400);
  }

  const updatedMovie = updateOneMovie(req.params.id, req.body );
  if (!updatedMovie) {
    return res.sendStatus(404);
  }
  return res.json(updatedMovie);
});


module.exports = router;
