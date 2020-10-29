import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEvent1603735984049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'fromDate',
            type: 'timestamp with time zone',
          },
          {
            name: 'toDate',
            type: 'timestamp with time zone',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'EventUser',
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('events');
  }
}
