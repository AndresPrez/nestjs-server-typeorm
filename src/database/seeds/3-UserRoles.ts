import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoles0000000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dummyUser = await queryRunner.query(
      "SELECT id, username from public.user WHERE username='dummy';",
    );
    const adminUser = await queryRunner.query(
      "SELECT id, username from public.user WHERE username='admin';",
    );

    await queryRunner.query(
      `INSERT INTO public.user_user_roles_role VALUES ('${dummyUser[0].id}', 'USER'), ('${adminUser[0].id}', 'USER'), ('${adminUser[0].id}', 'ADMIN')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.user_user_roles_role;`);
  }
}
