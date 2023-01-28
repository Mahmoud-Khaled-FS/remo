import { genreList } from '../constants/genre';
import { MovieData, MovieListItem } from '../types/movies';

export function formatMovie(movie: MovieData) {
  const title = `<b>${movie.title}</b>`;
  const sep = '----------------------------';
  const pop = `Popularity: <b>${movie.popularity}</b>`;
  const rate = `Rating: <b>${movie.vote_average.toFixed(0)}/10</b>`;
  const abult = `Adult: <b>${movie.adult ? 'Yes' : 'No'}</b>`;
  const release = `Relase date: <b>${movie.release_date}</b>`;
  const oL = `Original language: <b>${movie.original_language}</b>`;
  let genText = '';
  if (movie.genre_ids) {
    genText = movie.genre_ids.reduce(
      (c, g, i) =>
        c + `<b>${genreList.find((gen) => gen.id === +g)?.name}</b>` + (i === movie.genre_ids!.length - 1 ? '' : ', '),
      '',
    );
  } else if (movie.genres) {
    genText = movie.genres.reduce(
      (c, g, i) => c + `<b>${g.name}</b>` + (i === movie.genres!.length - 1 ? '' : ', '),
      '',
    );
  }

  return `${title}\n\n${sep}\nOverview:\n${movie.overview}\n${sep}\n${genText}\n\n${rate}\n${pop}\n${release}\n${abult}\n${oL}`;
}
export function formatMovieLink(path: string) {
  return 'https://image.tmdb.org/t/p/original' + path;
}

export function formatMoviesListMessageHeader(moviesList: MovieListItem[]) {
  const title = `<b>Results ${moviesList.length}</b>`;
  const textListMovies = moviesList.map((m, i) => `${i + 1}. ${m.title}\n`).join('');
  // let textListMovies = '';
  // for (let i = itemToDisplayStart - 1; i <= itemToDisplayEnd - 1; i++) {
  //   textListMovies += `${i + 1}. ${moviesList[i].title}\n`;
  // }
  return `${title}\n\n${textListMovies}`;
}
