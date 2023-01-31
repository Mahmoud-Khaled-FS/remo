export const movieFromMessageRegexp = new RegExp('^m:(?<name>.*)', 'gi');
export const moviesListFromMessageRegexp = new RegExp('^l:(?<name>.*)', 'gi');
export const trendListFromMessageRegexp = new RegExp('^t:(?<name>.*)', 'gi');
export const randomMovieMessageRegexp = new RegExp('rand:', 'gi');
export const movieIdActionRegexp = new RegExp('^id:[0-9]*', 'g');
export const movieGenreIdActionRegexp = new RegExp('^id_g:[0-9]*', 'g');
export const movieRecActionRegexp = new RegExp('^rec:[0-9]*', 'g');
export const changeLangRegexp = new RegExp('^change_lang:[a-z]{2}', 'g');
export const changeAdultRegexp = new RegExp('^change_adult:[a-z]{4}', 'g');
export const trailerRegexp = new RegExp('^trailer:.*', 'g');
