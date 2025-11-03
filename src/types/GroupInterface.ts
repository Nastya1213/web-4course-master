import StudentInterface from './StudentInterface';
interface GroupInterface {
  id: number;
  name: string;
  contacts: string;          // добавляем, чтобы совпадало с сущностью Group
  students?: StudentInterface[]; // массив студентов группы
};

export default GroupInterface;
