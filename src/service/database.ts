import { DataSource } from 'typeorm';
import * as path from 'path';
import User from '../models/user';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.join(__dirname, '..', '..', 'remo.db'),
  entities: [User],
  synchronize: true,
  logging: false,
});

export default AppDataSource;

export const userRepository = AppDataSource.getRepository(User);
