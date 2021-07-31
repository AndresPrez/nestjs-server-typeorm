import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcrypt';

async function hashPassword(password: string, customSalt?: string) {
  const salt = customSalt || (await bcrypt.genSalt(1));
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export class Users0000000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dummyHashPassword = await hashPassword('pass');
    const adminHashPassword = await hashPassword('admin');
    await queryRunner.query(
      `INSERT INTO public.user (username, password, "isActive") VALUES ('dummy', '${dummyHashPassword}', true), ('admin', '${adminHashPassword}', true);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.user;`);
  }
}
