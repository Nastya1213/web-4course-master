// Интерфейс — это как "контракт" или шаблон, который описывает, 
// как должен выглядеть объект (данные) о студенте в твоём коде. 
// Он не содержит логики или функций — только структуру.

// Любой объект, который претендует быть StudentInterface,
// должен иметь эти свойства (поля) с этими типами.

interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: number;
  contacts: string; 
  uuid?: string; 
  isDeleted?: boolean;
};

export default StudentInterface;
