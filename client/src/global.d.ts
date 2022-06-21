interface IList {
  id: string;
  listName: string;
  listDesc: string;
}

type ListCardProps = {
  list: IList;
};
