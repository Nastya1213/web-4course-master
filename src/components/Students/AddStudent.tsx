'use client';

import { useState, useEffect } from 'react';
import type StudentInterface from '@/types/StudentInterface';
import type GroupInterface from '@/types/GroupInterface';
import { getGroupsApi } from '@/api/groupsApi';

interface Props {
  onAdd: (data: Omit<StudentInterface, 'id'>) => void;
}

const AddStudent = ({ onAdd }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [groupId, setGroupId] = useState<number>(1);
  const [contacts, setContacts] = useState('');
  const [groups, setGroups] = useState<GroupInterface[]>([]);

  // Загружаем группы
  useEffect(() => {
    const fetchGroups = async () => {
      const data = await getGroupsApi();
      setGroups(data);
      if (data.length > 0) setGroupId(data[0].id); // по умолчанию первая группа
    };
    fetchGroups();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ firstName, lastName, middleName, groupId, contacts });
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setGroupId(groups.length > 0 ? groups[0].id : 1);
    setContacts('');
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

      <select
        value={groupId}
        onChange={(e) => setGroupId(Number(e.target.value))}
        required
      >
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>

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
