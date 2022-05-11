import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const gamesTable = new Table({
  name: 'games',
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
      name: 'path',
      type: 'varchar',
    },
    {
      name: 'custom_mod_path',
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

export class Games1652299843979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(gamesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(gamesTable);
  }
}
