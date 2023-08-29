var express = require('express');
var router = express.Router();

const MOVIES = [
  {
    id: 1,
    title: 'MOVIE: the movie',
    duration: 120,
    budget: 200,
    img: './',
  },
  {
    id: 2,
    title: 'NOVIE2',
    duration: 180,
    budget: 300,
    img: './',
  },
];

/* GET home page. */
/* Read all the movies from the MOVIES
   GET /movies?order=title : ascending order by title
   GET /movies?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
  const orderByTitle =
    req?.query?.order?.includes('title')
      ? req.query.order
      : undefined;
  const orderByDuration = 
    req?.query['minimum-duration']
      ? parseInt(req.query['minimum-duration']) 
      : undefined;
  const orderByBudget =
    req?.query['budget']
      ? parseInt(req.query['budget'])
      : undefined;

  let orderedMovies;
  console.log(`order by ${orderByTitle ?? 'not requested'}`);

  if (orderByTitle)
    orderedMovies = [...MOVIES].sort((a, b) => a.title.localeCompare(b.title));
  if (orderByTitle === '-title') orderedMovies = orderedMovies.reverse();

  if(orderByDuration<0)
    return res.sendStatus(400);
  else if (orderByDuration)
    orderedMovies = [...MOVIES].filter(movie => movie.duration >= orderByDuration);
  
  if(orderByDuration<0)
    return res.sendStatus(400);
  else if (orderByBudget)
    orderedMovies = [...MOVIES].filter(a => a.budget >= orderByBudget);

  console.log('GET /movies');
  res.json(orderedMovies ?? MOVIES);
});

// Read the movies identified by an id in the MOVIES
router.get('/:id', (req, res) => {
  console.log(`GET /movies/${req.params.id}`);

  const indexOfMovieFound = MOVIES.findIndex((movies) => movies.id == req.params.id);

  if (indexOfMovieFound < 0) return res.sendStatus(404);

  res.json(MOVIES[indexOfMovieFound]);
});

// Create a movie to be added to the MOVIES.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const img = req?.body?.img?.length !== 0 ? req.body.img : undefined;

  console.log('POST /movies');

  if (!title || !img) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = MOVIES?.length !== 0 ? MOVIES.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? MOVIES[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newMovie = {
    id: nextId,
    title: title,
    img: img,
  };

  MOVIES.push(newMovie);

  res.json(newMovie);
});

// Delete a movie from the movies based on its id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /movies/${req.params.id}`);

  const foundIndex = MOVIES.findIndex(movie => movie.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMovies = MOVIES.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMovies[0];

  res.json(itemRemoved);
});

// Update a movie based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /movies/${req.params.id}`);

  const title = req?.body?.title;
  const img = req?.body?.img;
  console.log('title = ', title);
  console.log('img = ', img);

  console.log('POST /movies');

  if ((!title && !img) || title?.length === 0 || img?.length === 0) return res.sendStatus(400);

  const foundIndex = MOVIES.findIndex(movie => movie.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedMovie = {...MOVIES[foundIndex], ...req.body};

  MOVIES[foundIndex] = updatedMovie;

  res.json(updatedMovie);
});








module.exports = router;
