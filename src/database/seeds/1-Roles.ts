import { MigrationInterface, QueryRunner } from 'typeorm';

export class Roles0000000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.role (name, description) VALUES ('USER', 'Regular user'), ('ADMIN', 'Admin user');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.role;`);
  }
}
