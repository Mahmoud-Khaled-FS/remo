import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { PrimaryColumn } from 'typeorm/decorator/columns/PrimaryColumn';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  lang: string;
}

export default User;
