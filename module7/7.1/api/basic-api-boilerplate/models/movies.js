const path = require('node:path');
const { serialize, parse } = require('../utils/json');
const jsonDbPath = path.join(__dirname, '/../data/movies.json');

const MOVIES = [
  {
    id: 1,
    title: 'MOVIE: the movie',
    duration: 120,
    budget: 200,
    link: 'https://moodle.vinci.be/',
  },
  {
    id: 2,
    title: 'NOVIE2',
    duration: 180,
    budget: 300,
    link: 'https://moodle.vinci.be/',
  },
];

/* GET home page. */
/* Read all the movies from the MOVIES
   GET /movies?order=title : ascending order by title
   GET /movies?order=-title : descending order by title
*/
function readAllMovies(orderBy) {
  const orderByTitle = orderBy?.order?.includes('title') 
    ? orderBy.order 
    : undefined;
  const orderByDuration = orderBy?.['minimum-duration']
    ? parseInt(orderBy['minimum-duration'])
    : undefined;
  const orderByBudget = orderBy?.['budget'] 
    ? parseInt(orderBy?.['budget']) 
    : undefined;
  let orderedMovies;
  const movies = parse(jsonDbPath, MOVIES);

  console.log('orderByTitle', orderByTitle);
  if (orderByTitle) orderedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
  if (orderByTitle === '-title') orderedMovies = orderedMovies.reverse();

  console.log('orderByDuration: ', orderByDuration);
  if (orderByDuration < 0) return res.sendStatus(400);
  else if (orderByDuration)
    orderedMovies = [...movies].filter((movie) => movie.duration >= orderByDuration);

  if (orderByDuration < 0) return res.sendStatus(400);
  else if (orderByBudget) orderedMovies = [...movies].filter((a) => a.budget >= orderByBudget);

  const allMoviesPotentiallyOrdered = orderedMovies ?? movies;
  return allMoviesPotentiallyOrdered;
}

// Read the movies identified by an id in the MOVIES
function readOneMovie(id) {
  const idNumber = parseInt(id, 10);
  const moviesDb = parse(jsonDbPath, MOVIES);
  const indexOfMovieFound = moviesDb.findIndex((movies) => movies.id == idNumber);

  if (indexOfMovieFound < 0) return undefined;
  return moviesDb[indexOfMovieFound];
}

// Create a movie to be added to the MOVIES.
function createOneMovie(title, duration, budget, link) {
  const movies = parse(jsonDbPath, MOVIES);

  const newMovie = {
    id: getNextId(),
    title,
    duration,
    budget,
    link,
  };

  movies.push(newMovie);
  serialize(jsonDbPath, movies);
  return newMovie;
}

function getNextId() {
  const movies = parse(jsonDbPath, MOVIES);
  const lastItemIndex = movies?.length !== 0 ? movies.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = movies[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

// Delete a movie from the movies based on its id
function deleteOneMovie(id) {
  const idNumber = parseInt(id, 10);
  const movies = parse(jsonDbPath, MOVIES);
  const foundIndex = movies.findIndex((movie) => movie.id == idNumber);

  if (foundIndex < 0) return undefined;
  const itemsRemovedFromMovies = movies.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMovies[0];
  serialize(jsonDbPath, movies);

  return itemRemoved;
}

// Update a movie based on its id and new values for its parameters
function updateOneMovie(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const movies = parse(jsonDbPath, MOVIES);
  const foundIndex = movies.findIndex((movie) => movie.id == idNumber);
  if (foundIndex < 0) return undefined;
  
  const updatedMovie = { ...movies[foundIndex], ...propertiesToUpdate };

  movies[foundIndex] = updatedMovie;

  serialize(jsonDbPath, movies);

  return updatedMovie;
}

module.exports = {
  readAllMovies,
  readOneMovie,
  createOneMovie,
  deleteOneMovie,
  updateOneMovie,
};
