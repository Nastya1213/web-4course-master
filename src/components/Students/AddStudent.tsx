'use client';

import { useState } from 'react';
import type StudentInterface from '@/types/StudentInterface';

interface Props {
  onAdd: (data: Omit<StudentInterface, 'id'>) => void;
}

const AddStudent = ({ onAdd }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [groupId, setGroupId] = useState(1);
  const [contacts, setContacts] = useState(''); // Новое поле для contacts

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ firstName, lastName, middleName, groupId, contacts }); // Добавляем contacts
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setGroupId(1);
    setContacts(''); // Очищаем contacts
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Имя"
        required
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Фамилия"
        required
      />
      <input
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
        placeholder="Отчество"
        required
      />
      <input
        type="number"
        value={groupId}
        onChange={(e) => setGroupId(Number(e.target.value))}
        placeholder="ID группы"
        required
      />
      <input
        value={contacts}
        onChange={(e) => setContacts(e.target.value)}
        placeholder="Контакты (email)"
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddStudent;