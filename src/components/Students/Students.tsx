'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { Students } = useStudents();

  return (
    <div className={styles.Students}>
      {Students.map((Student: StudentInterface) => (
        <h2 key={Student.id}>
          {Student.first_name} {Student.last_name}
        </h2>
      ))}
    </div>
  );
};

export default Students;
