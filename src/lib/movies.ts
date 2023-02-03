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
  async getMoviesByName(name: string): Promise<MovieData | null> {
    try {
      const subUrl = '/search/movie';
      const result = await axios.get(`${this.generateUrl(subUrl)}&query=${name}`);
      return result.data.results[0];
    } catch {
      return null;
    }
  }
  async getListMoviesByName(name: string): Promise<MovieData[] | null> {
    try {
      const subUrl = '/search/movie';
      const result = await axios.get(`${this.generateUrl(subUrl)}&query=${name}`);
      return result.data.results.slice(0, 10);
    } catch {
      return null;
    }
  }
  async getMovieById(id: number): Promise<MovieData | null> {
    try {
      const subUrl = `/movie/${id}`;
      const result = await axios.get(`${this.generateUrl(subUrl)}`);
      if (!result.data) throw new Error();
      return result.data;
    } catch {
      return null;
    }
  }
  async getTrendingMoviesList(time: TrendingTime): Promise<MovieData[] | null> {
    try {
      const subUrl = `/trending/movie/${time}`;
      const result = await axios.get(`${this.generateUrl(subUrl)}`);
      return result.data.results.slice(0, 10);
    } catch {
      return null;
    }
  }
  async getMovieRecommendations(id: number): Promise<MovieData[] | null> {
    try {
      const subUrl = `/movie/${id}/recommendations`;
      const result = await axios.get(`${this.generateUrl(subUrl)}`);
      return result.data.results.slice(0, 10);
    } catch {
      return null;
    }
  }
  async getRandomMovie(): Promise<MovieData | null> {
    try {
      const subUrl = `/movie/popular`;
      const page = randomInt(1, 100);
      const result = await axios.get(`${this.generateUrl(subUrl)}&page=${page}`);
      return sample(result.data.results);
    } catch {
      return null;
    }
  }
  async getRandomMovieWithGenre(id: string): Promise<MovieData | null> {
    try {
      const maxPage = id.includes(',') ? 10 : 100;
      const subUrl = `/discover/movie`;
      const page = randomInt(1, maxPage);
      let result = await axios.get(
        `${this.generateUrl(subUrl)}&page=${page}&with_genres=${id}&sort_by=popularity.desc`,
      );
      if (result.data.total_pages < page && result.data.results.length === 0) {
        result = await axios.get(`${this.generateUrl(subUrl)}&page=1&with_genres=${id}&sort_by=popularity.desc`);
      }
      return sample(result.data.results);
    } catch (err) {
      return null;
    }
  }

  async getCast(id: string): Promise<string[] | null> {
    try {
      const subUrl = `/movie/${id}/credits`;
      const result = await axios.get(`${this.generateUrl(subUrl)}`);
      return result.data.cast.slice(0, 10).map((c: any) => c.name);
    } catch {
      return null;
    }
  }

  async getTrailer(search: string) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&type=video&part=snippet&q=${search}'trailer'`;
      const result = await axios.get(url);
      const id = result.data.items[0].id.videoId;
      const videoUrl = `https://www.youtube.com/watch?v=${id}`;
      return videoUrl;
    } catch (err) {
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
