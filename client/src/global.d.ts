interface IList {
  id: string;
  listName: string;
  listDesc: string;
}
interface ILists {
  lists: IList[];
}

interface ITodo {
  id: string;
  title: string;
  content: string;
  deadline: string;
  status: string;
  priority: string;
  list: {
    id: string;
    listName: string
  }
}

interface ITodos {
  todos: ITodo[];
}

type ListCardProps = {
  list: IList;
};
type TodoRowProps = {
  todo: ITodo;
};

type TodoTableRowProps = {
  columns: any;
  todo: any;
  i: number
}
type EditTodoFormProps = { 
  todo: ITodo;
  listId: string | null 
}