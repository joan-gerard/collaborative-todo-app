interface IList {
  id: string;
  listName: string;
  listDesc: string;
}
interface ILists {
  lists: IList[]
}

type ListCardProps = {
  list: IList;
};
