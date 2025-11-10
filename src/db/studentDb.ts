import { Student } from './entity/Student.entity';
import type StudentInterface from '@/types/StudentInterface';
import getRandomFio from '@/utils/getRandomFio';
import AppDataSource from './AppDataSource';
import { v4 as uuidv4 } from 'uuid';

const studentRepository = AppDataSource.getRepository(Student);

/**
 * Получение студентов
 */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  return await studentRepository.find({
    relations: ['group'], // ✅ загружаем связанную группу
  });
};
/**
 * Удаление студента (soft-delete)
 */
export const deleteStudentDb = async (studentId: number): Promise<number> => {
  await studentRepository.delete(studentId); // ✅ реально удаляем
  return studentId;
};


/**
 * Добавление студента
 */
export const addStudentDb = async (studentFields: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
  const student = new Student();
  const newStudent = await studentRepository.save({
    ...student,
    ...studentFields,
    isDeleted: false, // Добавляем явно
    uuid: studentFields.uuid ?? uuidv4(), // Генерируем uuid, если не передан
  });
  return newStudent;
};

/**
 * Добавление рандомных студентов
 */
export const addRandomStudentsDb = async (amount: number = 10): Promise<StudentInterface[]> => {
  const students: StudentInterface[] = [];

  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();
    const newStudent = await addStudentDb({
      ...fio,
      contacts: 'contact@example.com', // По аналогии с твоим кодом
      groupId: 1,
      uuid: uuidv4(), // Добавляем uuid
      isDeleted: false,
    });
    students.push(newStudent);
  }

  return students;
};