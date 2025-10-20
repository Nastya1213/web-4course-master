import { getStudentsDb, addStudentDb } from '@/db/studentDb';
import type StudentInterface from '@/types/StudentInterface';
import { NextResponse } from 'next/server';
import AppDataSource from '@/db/AppDataSource';

export async function GET(): Promise<NextResponse> {
  try {
    // Проверяем, инициализирована ли БД
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const students = await getStudentsDb();
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Проверяем инициализацию
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const student = await request.json();
    
    // Валидация обязательных полей
    const requiredFields: (keyof Omit<StudentInterface, 'id'>)[] = [
      'firstName',
      'lastName',
      'middleName',
      'groupId',
      'contacts',
    ];
    for (const field of requiredFields) {
      if (!student[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Добавляем isDeleted и uuid, если их нет
    const studentData: Omit<StudentInterface, 'id'> = {
      ...student,
      contacts: student.contacts || 'default@example.com', // Значение по умолчанию
      uuid: student.uuid || undefined, // Опционально
      isDeleted: student.isDeleted ?? false, // По умолчанию false
    };

    const newStudent = await addStudentDb(studentData);
    console.log('New student added:', newStudent); // Лог для отладки

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json({ error: 'Failed to add student' }, { status: 500 });
  }
}