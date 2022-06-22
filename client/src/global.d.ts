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
