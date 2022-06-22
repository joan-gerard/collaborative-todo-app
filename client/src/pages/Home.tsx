import React from "react";
import AddListModal from "../components/AddListModal";
import AddTodoModal from "../components/AddTodoModal";
import Lists from "../components/Lists";
import Todos from "../components/Todos";

const Home = () => {
  return (
    <div>
      <AddTodoModal />
      <Todos />
      <AddListModal />
      <Lists />
    </div>
  );
};

export default Home;
