'use client';

import { useForm } from 'react-hook-form';
import type StudentInterface from '@/types/StudentInterface';

type FormData = Pick<StudentInterface, 'firstName' | 'lastName' | 'middleName' | 'groupId'>;

interface AddStudentProps {
  onAdd: (data: FormData) => void;
}

export default function AddStudent({ onAdd }: AddStudentProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onAdd(data);  // Вызываем мутацию из хука
    reset();  // Очищаем форму
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Добавить студента</h2>
      <div>
        <label>Имя:</label>
        <input {...register('firstName', { required: 'Имя обязательно' })} />
        {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName.message}</span>}
      </div>
      <div>
        <label>Фамилия:</label>
        <input {...register('lastName', { required: 'Фамилия обязательна' })} />
        {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName.message}</span>}
      </div>
      <div>
        <label>Отчество:</label>
        <input {...register('middleName', { required: 'Отчество обязательно' })} />
        {errors.middleName && <span style={{ color: 'red' }}>{errors.middleName.message}</span>}
      </div>
      <div>
        <label>ID Группы:</label>
        <input 
          type="number" 
          {...register('groupId', { 
            required: 'Группа обязательна', 
            valueAsNumber: true,
            min: { value: 1, message: 'ID группы должен быть больше 0' }
          })} 
        />
        {errors.groupId && <span style={{ color: 'red' }}>{errors.groupId.message}</span>}
      </div>
      <button type="submit">Добавить студента</button>
    </form>
  );
}