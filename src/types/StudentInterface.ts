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
  groupId: number;  // Добавлено: соответствует полю в БД
  uuid?: string;     // помогает "мгновенно" показывать нового студента в списке на клиенте, не дожидаясь ответа сервера.
  isDeleted?: boolean;
};

export default StudentInterface;
