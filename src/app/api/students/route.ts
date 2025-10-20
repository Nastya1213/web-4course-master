import { getStudentsDb, addStudentDb } from '@/db/studentDb';

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(request: Request): Promise<Response> {
  try {
    const student = await request.json();  // Парсим body запроса (как в подсказке)
    const newStudent = await addStudentDb(student);  // Вызов добавления в БД
    console.log(newStudent);  // Лог, как в подсказке

    return new Response(JSON.stringify(newStudent), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 201,  // Успешное создание
    });
  } catch (error) {
    console.error('Error adding student:', error);  // Лог ошибки для отладки
    return new Response(JSON.stringify({ error: 'Failed to add student' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,  // Ошибка сервера
    });
  }
};