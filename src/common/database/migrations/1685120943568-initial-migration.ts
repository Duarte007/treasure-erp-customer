import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1685120943568 implements MigrationInterface {
  name = 'initialMigration1685120943568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("customer_id" SERIAL NOT NULL, "customer_uuid" uuid NOT NULL, "address_uuid" uuid NOT NULL, "customer_name" character varying(255) NOT NULL, "customer_document" character varying(255) NOT NULL, "customer_email" character varying(255) NOT NULL, "customer_phone" character varying(255) NOT NULL, CONSTRAINT "UQ_cbed6638c2d907c22c7a8be32cf" UNIQUE ("customer_document"), CONSTRAINT "UQ_4c680105e943b9c9880caaa18ff" UNIQUE ("customer_email"), CONSTRAINT "UQ_d061555fa11e25b08b437773307" UNIQUE ("customer_phone"), "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_6c444ce6637f2c1d71c3cf136c1" PRIMARY KEY ("customer_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_customer_uuid" ON "customers" ("customer_uuid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_address_uuid" ON "customers" ("address_uuid") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "idx_address_uuid"`);
    await queryRunner.query(`DROP INDEX "idx_customer_uuid"`);
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
