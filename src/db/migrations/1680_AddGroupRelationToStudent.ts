import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGroupRelationToStudent1680 implements MigrationInterface {
    name = 'AddGroupRelationToStudent1680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_student_group"
            FOREIGN KEY ("groupId") REFERENCES "group"("id")
            ON DELETE SET NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "student"
            DROP CONSTRAINT "FK_student_group"
        `);
    }
}
