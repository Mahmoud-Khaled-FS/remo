import { genreList } from '../constants/genre';
import User from '../models/user';
import { MovieData } from '../types/movies';

export function getFormatMovieArgs(movie: MovieData, lang = 'en') {
  let genText = '';
  if (movie.genre_ids) {
    genText = movie.genre_ids.reduce((c, g, i) => {
      const gen = genreList.find((gen) => gen.id === +g);
      if (!gen) return '';
      return c + `${lang === 'ar' ? gen.ar_name : gen.name}` + (i === movie.genre_ids!.length - 1 ? '' : ', ');
    }, '');
  } else if (movie.genres) {
    genText = movie.genres.reduce((c, g, i) => c + `${g.name}` + (i === movie.genres!.length - 1 ? '' : ', '), '');
  }
  const dataListForFormat = [
    movie.title,
    movie.overview,
    genText,
    movie.vote_average + '/10',
    movie.popularity,
    movie.release_date,
    movie.adult ? 'Yes' : 'No',
    movie.original_language,
  ];

  return dataListForFormat;
}
export function formatMovieLink(path: string) {
  return 'https://image.tmdb.org/t/p/original' + path;
}

export function getFormatListMoviesArgs(moviesList: MovieData[]) {
  const moviesNumber = moviesList.length;
  const textListMovies = moviesList
    .map((m, i) => {
      const year = new Date(m.release_date).getFullYear();
      return `${i + 1}. ${m.original_title}  (${year})\n`;
    })
    .join('');
  return [moviesNumber, textListMovies];
}

type UserLang = 'ar' | 'en';
export function formatAnswerToSend(user: User, template: { ar: string; en: string }, args: any[]) {
  let t = template[user.lang as UserLang];
  if (!t) return '';
  for (const arg of args) {
    t = t.replace('%%', arg);
  }
  return t;
}
