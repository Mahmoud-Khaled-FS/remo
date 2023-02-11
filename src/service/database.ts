import { DataSource } from 'typeorm';
// import * as path from 'path';
import User from '../models/user';
import Movie from '../models/movies';
import Link from '../models/links';

const AppDataSource = new DataSource({
  type: 'mysql',
  // database: path.join(__dirname, '..', '..', 'remo.db'),
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  port: +process.env.MYSQLPORT!,
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  entities: [User, Movie, Link],
  synchronize: true,
  logging: false,
});

export default AppDataSource;

export const userRepository = AppDataSource.getRepository(User);
export const movieRepository = AppDataSource.getRepository(Movie);
export const linkRepository = AppDataSource.getRepository(Link);
