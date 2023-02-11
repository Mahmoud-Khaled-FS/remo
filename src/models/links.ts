import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Link {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @Column()
  userName: string;
  @Column()
  movieId: number;
  @Column()
  movieName: string;
}

export default Link;
