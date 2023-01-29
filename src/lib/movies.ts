import axios from 'axios';
import { MovieData, TrendingTime } from '../types/movies';
import User from '../models/user';
import { sample } from 'lodash';

// const url = 'https://api.themoviedb.org/3';
class Movies {
  private static url = 'https://api.themoviedb.org/3';
  private api_key = process.env.MOVIES_DB_API_KEY as string;
  private lang = 'en';
  private adult = true;
  constructor(user?: User) {
    if (user) {
      this.lang = user.lang;
      this.adult = user.adult;
    }
  }
  async getMoviesByName(name: string) {
    try {
      const subUrl = '/search/movie';
      const result = await axios.get(`${this.generateUrl(subUrl)}&query=${name}`);
      return result.data.results[0] as MovieData;
    } catch {
      return null;
    }
  }
  async getListMoviesByName(name: string) {
    try {
      const subUrl = '/search/movie';
      const result = await axios.get(`${this.generateUrl(subUrl)}&query=${name}`);
      return (result.data.results as any[]).map((r) => ({ id: r.id, title: r.title })).slice(0, 10);
    } catch {
      return null;
    }
  }
  async getMovieById(id: number) {
    try {
      const subUrl = `/movie/${id}`;
      const result = await axios.get(`${this.generateUrl(subUrl)}`);
      if (!result.data) throw new Error();
      return result.data as MovieData;
    } catch {
      return null;
    }
  }
  async getTrendingMoviesList(time: TrendingTime) {
    try {
      const subUrl = `/trending/movie/${time}`;
      const result = await axios.get(`${this.generateUrl(subUrl)}`);
      return (result.data.results as any[]).map((r) => ({ id: r.id, title: r.title })).slice(0, 10);
    } catch {
      return null;
    }
  }
  async getMovieRecommendations(id: number) {
    try {
      const subUrl = `/movie/${id}/recommendations`;
      const result = await axios.get(`${this.generateUrl(subUrl)}`);
      return (result.data.results as any[]).map((r) => ({ id: r.id, title: r.title })).slice(0, 10);
    } catch {
      return null;
    }
  }
  async getRandomMovie() {
    try {
      const subUrl = `/movie/popular`;
      const page = randomInt(1, 100);
      const result = await axios.get(`${this.generateUrl(subUrl)}&page=${page}`);
      return sample(result.data.results) as MovieData;
    } catch {
      return null;
    }
  }
  async getRandomMovieWithGenre(id: string) {
    try {
      const subUrl = `/discover/movie`;
      const page = randomInt(1, 100);
      const result = await axios.get(
        `${this.generateUrl(subUrl)}&page=${page}&with_genres=${id}&sort_by=popularity.desc`,
      );
      return sample(result.data.results) as MovieData;
    } catch {
      return null;
    }
  }
  private generateUrl(path: string) {
    return `${Movies.url}${path}?api_key=${this.api_key}&append_to_response=videos&language=${this.lang}${
      this.adult ? '&include_adult=true' : ''
    }`;
  }
}

export default Movies;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
