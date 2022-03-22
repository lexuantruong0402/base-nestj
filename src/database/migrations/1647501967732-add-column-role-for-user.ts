import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnRoleForUser1647501967732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user
          ADD role ENUM('admin', 'user') DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE user DROP COLUMN role; `);
  }
}
