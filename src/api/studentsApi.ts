import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);
    const Students = await response.json() as StudentInterface[];
    return Students;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};
