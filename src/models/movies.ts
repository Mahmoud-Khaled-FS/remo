import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Movie {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  link: string;
}

export default Movie;
