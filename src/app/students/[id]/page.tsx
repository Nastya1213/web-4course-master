'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import useStudents from '@/hooks/useStudents';
import Page from '@/components/layout/Page/Page';
import BackLink from '@/components/Common/BackLink';

const StudentPage = () => {
  const params = useParams();
  const { id } = params; // id из URL
  const { students } = useStudents();

  if (!id) return <Page>Загрузка...</Page>;

  const student = students.find((s) => s.id === Number(id));

  if (!student) return <Page>Студент не найден</Page>;

  return (
    <Page>
      <BackLink href="/students" text="<< список студентов" />

      <h1 className="text-2xl font-bold mt-4">
        {student.firstName} {student.lastName}
      </h1>

      <p><strong>Отчество:</strong> {student.middleName}</p>
      <p><strong>Контакты:</strong> {student.contacts}</p>
      <p><strong>Группа:</strong> {student.group?.name ?? 'Без группы'}</p>
    </Page>
  );
};

export default StudentPage;
