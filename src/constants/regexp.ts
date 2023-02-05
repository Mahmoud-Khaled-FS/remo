export const movieFromMessageRegexp = new RegExp('^m:(?<name>.+)', 'gi');
export const moviesListFromMessageRegexp = new RegExp('^l:(?<name>.*)', 'gi');
export const trendListFromMessageRegexp = new RegExp('^t:(?<name>.*)', 'gi');
export const randomMovieMessageRegexp = new RegExp('rand:', 'gi');
export const movieGenreMessageRegexp = new RegExp('^g:.*', 'gi');
export const movieIdActionRegexp = new RegExp('^id:[0-9]*', 'g');
export const movieGenreIdActionRegexp = new RegExp('^id_g:.*', 'g');
export const movieGenreAndActionRegexp = new RegExp('^g_(?<type>(and|or)):.+', 'gi');
export const movieRecActionRegexp = new RegExp('^rec:[0-9]*', 'g');
export const movieLinkActionRegexp = new RegExp('^m_link:[0-9]*', 'g');
export const changeLangRegexp = new RegExp('^change_lang:[a-z]{2}', 'g');
export const changeAdultRegexp = new RegExp('^change_adult:[a-z]{4}', 'g');
export const trailerRegexp = new RegExp('^trailer:.*', 'g');
export const topCastActionRegexp = new RegExp('^top_cast:[0-9]*', 'g');
export const askAddLinkActionRegexp = new RegExp('^ask_link:[0-9]*', 'g');
export const acceptLinkActionRegexp = new RegExp('^acc_link:.*', 'g');
export const urlRegexp = new RegExp(
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  'gi',
);
