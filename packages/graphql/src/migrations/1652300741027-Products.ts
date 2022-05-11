import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const productsTable = new Table({
  name: 'products',
  columns: [
    {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'uuid',
    },
    {
      name: 'title',
      type: 'varchar',
    },
    {
      name: 'alias',
      type: 'varchar',
    },
    {
      name: 'description',
      type: 'varchar',
    },
    {
      name: 'logo_url',
      type: 'varchar',
    },
    {
      name: 'created_at',
      type: 'timestamp',
      default: 'now()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()',
    },
  ],
});

export class Products1652300741027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(productsTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(productsTable);
  }
}
