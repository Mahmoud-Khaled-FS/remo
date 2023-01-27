import { MovieData } from '../types/movies';

const genre = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

export function formatMovie(movie: MovieData) {
  const title = `<b>${movie.title}</b>`;
  const sep = '----------------------------';
  const pop = `Popularity: <b>${movie.popularity}</b>`;
  const abult = `Adult: <b>${movie.adult ? 'Yes' : 'No'}</b>`;
  const release = `Relase date: <b>${movie.release_date}</b>`;
  const oL = `Original language: <b>${movie.original_language}</b>`;
  console.log(movie.genre_ids);
  const genText = movie.genre_ids.reduce(
    (c, g, i) =>
      c + `<b>${genre.find((gen) => gen.id === +g)?.name}</b>` + (i === movie.genre_ids.length - 1 ? '' : ', '),
    '',
  );

  return `${title}\n\n${sep}\nOverview:\n${movie.overview}\n${sep}\n${genText}\n\n${pop}\n${release}\n${abult}\n${oL}`;
}
export function formatMovieLink(path: string) {
  return 'https://image.tmdb.org/t/p/original' + path;
}
