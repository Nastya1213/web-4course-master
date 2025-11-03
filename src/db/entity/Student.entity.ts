import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './Group.entity';

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

  // связь между студентом и группой
  @ManyToOne(() => Group, (group) => group.students, { eager: true, nullable: true })
  @JoinColumn({ name: 'groupId' })
  group!: Group | null;

  @Column({ nullable: true }) // Для обратной совместимости
  uuid?: string;

  @Column({ default: false }) // Для soft-delete
  isDeleted!: boolean;
}
