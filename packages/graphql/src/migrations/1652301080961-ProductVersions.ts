import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const productVersionTable = new Table({
  name: 'product_versions',
  columns: [
    {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'uuid',
    },
    {
      name: 'version',
      type: 'varchar',
    },
    {
      name: 'dependencies',
      type: 'varchar',
      isArray: true,
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
    {
      name: 'game_id',
      type: 'uuid',
    },
    {
      name: 'product_id',
      type: 'uuid',
    },
  ],
});

const gameFK = new TableForeignKey({
  columnNames: ['game_id'],
  referencedTableName: 'games',
  referencedColumnNames: ['id'],
  onDelete: 'CASCADE',
});

const productFK = new TableForeignKey({
  columnNames: ['product_id'],
  referencedTableName: 'products',
  referencedColumnNames: ['id'],
  onDelete: 'CASCADE',
});

export class ProductVersions1652301080961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(productVersionTable);
    await Promise.all([
      queryRunner.createForeignKey(productVersionTable, gameFK),
      queryRunner.createForeignKey(productVersionTable, productFK),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropForeignKey(productVersionTable, gameFK),
      queryRunner.dropForeignKey(productVersionTable, productFK),
    ]);
    await queryRunner.dropTable(productVersionTable);
  }
}
