import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Dated {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
