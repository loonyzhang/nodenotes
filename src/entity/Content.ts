import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  title!: string;

  @Column('varchar')
  slug!: string;

  @Column('int')
  created!: number;

  @Column('int')
  modified!: number;

  @Column('text')
  text!: string;

  @Column('int')
  seq!: number;

  @Column('int')
  authorId!: number;

  @Column('varchar')
  template!: string;

  @Column('varchar')
  type!: string;

  @Column('varchar')
  status!: string;

  @Column('varchar')
  password!: string;

  @Column('int')
  commentsNum!: number;

  @Column('char')
  allowComment!: string;

  @Column('char')
  allowPing!: string;

  @Column('char')
  allowFeed!: string;

  @Column('int')
  parent!: number;
}
