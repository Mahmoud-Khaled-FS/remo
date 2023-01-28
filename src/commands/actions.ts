import { Composer } from 'telegraf';
import {
  cancelMessage,
  changeAdultAction,
  changeLanguageAction,
  getMovieByIdFromMessage,
  getRecommendationsForMovie,
} from '../service/actions';
import { changeAdultRegexp, changeLangRegexp, movieIdActionRegexp, movieRecActionRegexp } from '../constants/regexp';

const actions = new Composer();

actions.action('cancel', cancelMessage);
actions.action('cancel_delete', cancelMessage);
actions.action(movieIdActionRegexp, getMovieByIdFromMessage);
actions.action(movieRecActionRegexp, getRecommendationsForMovie);
actions.action(changeLangRegexp, changeLanguageAction);
actions.action(changeAdultRegexp, changeAdultAction);

export default actions;
