import { Composer } from 'telegraf';
import {
  getMovieFromMessage,
  getMoviesListFromMessage,
  getRandomMovieFromMessage,
  getRandomMovieWithGenreFromMessage,
  getTrendingMoviesListFromMessage,
} from '../service/message';
import {
  movieFromMessageRegexp,
  movieGenreMessageRegexp,
  moviesListFromMessageRegexp,
  randomMovieMessageRegexp,
  trendListFromMessageRegexp,
} from '../constants/regexp';

const h = new Composer();

h.hears(movieFromMessageRegexp, getMovieFromMessage);
h.hears(moviesListFromMessageRegexp, getMoviesListFromMessage);
h.hears(trendListFromMessageRegexp, getTrendingMoviesListFromMessage);
h.hears(randomMovieMessageRegexp, getRandomMovieFromMessage);
h.hears(movieGenreMessageRegexp, getRandomMovieWithGenreFromMessage);

export default h;
