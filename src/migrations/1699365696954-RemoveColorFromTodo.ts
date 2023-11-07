import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveColorFromTodo1699365696954 implements MigrationInterface {
    name = 'RemoveColorFromTodo1699365696954';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "color"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "todo" ADD "color" character varying NOT NULL DEFAULT '#1abc9c'`
        );
    }
}
