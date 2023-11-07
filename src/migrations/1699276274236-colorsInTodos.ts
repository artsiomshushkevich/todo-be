import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ColorsInTodos1699276274236 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'todo',
            new TableColumn({
                name: 'color',
                type: 'varchar',
                default: "'#1abc9c'"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(
            'todo',
            new TableColumn({
                name: 'color',
                type: 'varchar'
            })
        );
    }
}
