import { DataSource } from 'typeorm';
import * as path from 'path';
import User from '../models/user';
import Movie from '../models/movies';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.join(__dirname, '..', '..', 'remo.db'),
  entities: [User, Movie],
  synchronize: true,
  logging: false,
});

export default AppDataSource;

export const userRepository = AppDataSource.getRepository(User);
export const movieRepository = AppDataSource.getRepository(Movie);
