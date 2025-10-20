import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteStudentApi, getStudentsApi, addStudentApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';
import { v4 as uuidv4 } from 'uuid';  // Для генерации UUID
import isServer from '@/utils/isServer';

interface StudentsHookInterface {
  students: StudentInterface[];
  deleteStudentMutate: (studentId: number) => void;
  addStudentMutate: (studentData: Omit<StudentInterface, 'id'>) => void;  // Новая функция

}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: false,
  });

// Query (запрос): "Покажи мне список студентов" — это GET-запрос, который читает данные.
// Mutation (мутация): "Добавь нового студента"
//  или "Удали студента" — это POST/DELETE-запросы, которые меняют данные на сервере.


  /**
   * Мутация добавления студента 
   */
  const addStudentMutate = useMutation({
    mutationFn: async (studentData: Omit<StudentInterface, 'id'>) => {
      const studentWithUuid = {
        ...studentData,
        uuid: uuidv4(),  // Генерируем UUID
      };
      return addStudentApi(studentWithUuid);  // Вызов API
    },
    onMutate: async (studentData) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      
      // Оптимистическое добавление temp-студента
      const tempStudent: StudentInterface = {
        id: -1,  // Плейсхолдер
        ...studentData,
        uuid: uuidv4(),  // Генерируем UUID для temp
        isDeleted: false,
      };
      
      queryClient.setQueryData<StudentInterface[]>(['students'], (old) => [
        ...(old ?? []),
        tempStudent,
      ]);
      
      return { previousStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> addStudentMutate error', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    onSuccess: (newStudent) => {
      console.log("dbhcbhdsbcub");
      // После успеха: инвалидируем для синхронизации с сервером
      // queryClient.invalidateQueries({ queryKey: ['students'] });
      refetch();
    },
  });


  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    // вызов API delete
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      let updatedStudents = [...(previousStudents ?? [])] ;

      if (!updatedStudents) return;

      // помечаем удаляемую запись
      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true } : {}),
      }));
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> deleteStudentMutate  err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onSuccess: async (studentId, variables, { previousStudents }) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // вариант 1 - запрос всех записей
      // refetch();

      // вариант 2 - удаление конкретной записи
      if (!previousStudents) {
        return;
      }
      const updatedStudents = previousStudents.filter((student: StudentInterface) => student.id !== studentId);
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
    },
    // onSettled: (data, error, variables, context) => {
    //   // вызывается после выполнения запроса в случаи удачи или ошибке
    //   console.log('>> deleteStudentMutate onSettled', data, error, variables, context);
    // },
  });

  return {
    students: data ?? [],
    deleteStudentMutate: deleteStudentMutate.mutate,
    addStudentMutate: addStudentMutate.mutate,
  };
};

export default useStudents;
