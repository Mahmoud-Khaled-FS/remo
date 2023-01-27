import axios from 'axios';
import { MovieData } from '../types/movies';

// const url = 'https://api.themoviedb.org/3';
class Movies {
  private static url = 'https://api.themoviedb.org/3';
  private api_key = process.env.MOVIES_DB_API_KEY as string;
  constructor() {}
  async getMoviesByName(name: string) {
    try {
      const subUrl = '/search/movie';
      const result = await axios.get(`${Movies.url}${subUrl}?api_key=${this.api_key}&query=${name}`);
      return result.data.results[0] as MovieData;
    } catch {
      return null;
    }
  }
}

export default Movies;
