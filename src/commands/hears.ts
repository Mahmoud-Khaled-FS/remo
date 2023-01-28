import { Composer } from 'telegraf';
import {
  getMovieFromMessage,
  getMoviesListFromMessage,
  getRandomMovieFromMessage,
  getTrendingMoviesListFromMessage,
} from '../service/message';
import {
  movieFromMessageRegexp,
  moviesListFromMessageRegexp,
  randomMovieMessageRegexp,
  trendListFromMessageRegexp,
} from '../constants/regexp';

const h = new Composer();

h.hears(movieFromMessageRegexp, getMovieFromMessage);
h.hears(moviesListFromMessageRegexp, getMoviesListFromMessage);
h.hears(trendListFromMessageRegexp, getTrendingMoviesListFromMessage);
h.hears(randomMovieMessageRegexp, getRandomMovieFromMessage);

export default h;
