import { Composer } from 'telegraf';
import * as action from '../service/actions';
import * as regex from '../constants/regexp';

const actions = new Composer();

actions.action('cancel', action.cancelMessage);
actions.action('cancel_delete', action.cancelMessage);
actions.action(regex.movieIdActionRegexp, action.getMovieByIdFromMessage);
actions.action(regex.movieGenreIdActionRegexp, action.getMovieByGenreFromMessage);
actions.action(regex.movieRecActionRegexp, action.getRecommendationsForMovie);
actions.action(regex.trailerRegexp, action.getTrailerFromMessage);
actions.action(regex.changeLangRegexp, action.changeLanguageAction);
actions.action(regex.changeAdultRegexp, action.changeAdultAction);
actions.action(regex.topCastActionRegexp, action.getCastFromMessage);
actions.action(regex.movieGenreAndActionRegexp, action.genreAndOrFromMessage);
actions.action(regex.movieLinkActionRegexp, action.getMovieLinkInTelegram);
actions.action(regex.askAddLinkActionRegexp, action.askToAddLinkMovie);
// actions.action(regex.acceptLinkActionRegexp, action.acceptAddLinkMovie);

export default actions;
