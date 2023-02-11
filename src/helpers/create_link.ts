import Link from '../models/links';
import AppDataSource from '../service/database';
import { MovieData } from '../types/movies';

export async function createLinkIDB(url: string, movie: MovieData, name: string) {
  const link = new Link();
  link.url = url;
  link.movieName = movie.original_title;
  link.movieId = movie.id;
  link.userName = name;

  return await AppDataSource.manager.save(link);
}
