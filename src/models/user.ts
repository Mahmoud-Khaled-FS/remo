import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { PrimaryColumn } from 'typeorm/decorator/columns/PrimaryColumn';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: 'en',
  })
  lang: string;
  @Column({
    default: 'true',
  })
  adult: boolean;
}

export default User;
