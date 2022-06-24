import React from "react";
import AddListModal from "../components/modals/AddListModal";
import AddTodoModal from "../components/modals/AddTodoModal";
import Lists from "../components/Lists";
import Todos from "../components/Todos";

const Home = () => {
  return (
    <div>
        <AddTodoModal />
        <Todos />
        <hr />
        <AddListModal />
        <Lists />
    </div>
  );
};

export default Home;
