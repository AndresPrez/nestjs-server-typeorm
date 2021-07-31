import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Dated } from './common';
import { Role } from './role.entity';

@Entity()
export class User extends Dated {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive?: boolean;

  @ManyToMany(() => Role)
  @JoinTable()
  userRoles: Role[];
}
