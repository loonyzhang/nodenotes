import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  password!: string;

  @Column('varchar')
  mail!: string;

  @Column('varchar')
  url!: string;

  @Column('int')
  created!: number;

  @Column('int')
  activated!: number;

  @Column('varchar')
  group!: string;

  @Column('int')
  authCode!: number;
}
