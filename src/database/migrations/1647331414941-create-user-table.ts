import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1647331414941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE user (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(30) NOT NULL,
        lastName VARCHAR(30) NOT NULL,
        email VARCHAR(50) UNIQUE,
        password VARCHAR(500),
        createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user;`);
  }
}
