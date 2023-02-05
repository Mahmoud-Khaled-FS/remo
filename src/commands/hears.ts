import { Composer } from 'telegraf';
import * as service from '../service/message';
import * as regexp from '../constants/regexp';

const h = new Composer();

h.hears(regexp.movieFromMessageRegexp, service.getMovieFromMessage);
h.hears(regexp.moviesListFromMessageRegexp, service.getMoviesListFromMessage);
h.hears(regexp.trendListFromMessageRegexp, service.getTrendingMoviesListFromMessage);
h.hears(regexp.randomMovieMessageRegexp, service.getRandomMovieFromMessage);
h.hears(regexp.movieGenreMessageRegexp, service.getRandomMovieWithGenreFromMessage);
h.hears(regexp.urlRegexp, service.getLinksFromUser);

export default h;
