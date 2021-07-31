import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Dated } from './common';

@Entity()
export class Role extends Dated {
  @PrimaryColumn()
  name: string;

  @Column()
  description: string;
}
