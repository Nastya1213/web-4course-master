import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  middleName!: string;

  @Column()
  contacts!: string;

  @Column()
  groupId!: number;

  @Column({ nullable: true }) // Для обратной совместимости
  uuid?: string;

  @Column({ default: false }) // Для soft-delete
  isDeleted!: boolean;
}
