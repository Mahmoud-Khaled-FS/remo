import { Composer } from 'telegraf';
import {
  cancelMessage,
  changeAdultAction,
  changeLanguageAction,
  getMovieByGenreFromMessage,
  getMovieByIdFromMessage,
  getRecommendationsForMovie,
  getTrailerFromMessage,
} from '../service/actions';
import {
  changeAdultRegexp,
  changeLangRegexp,
  movieGenreIdActionRegexp,
  movieIdActionRegexp,
  movieRecActionRegexp,
  trailerRegexp,
} from '../constants/regexp';

const actions = new Composer();

actions.action('cancel', cancelMessage);
actions.action('cancel_delete', cancelMessage);
actions.action(movieIdActionRegexp, getMovieByIdFromMessage);
actions.action(movieGenreIdActionRegexp, getMovieByGenreFromMessage);
actions.action(movieRecActionRegexp, getRecommendationsForMovie);
actions.action(trailerRegexp, getTrailerFromMessage);
actions.action(changeLangRegexp, changeLanguageAction);
actions.action(changeAdultRegexp, changeAdultAction);

export default actions;
