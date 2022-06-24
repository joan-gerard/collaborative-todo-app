import logo from "./assets/logo.png";
import { useOthers } from "@liveblocks/react";

const WhoIsHere = () => {
  const others = useOthers();

  return (
    <div className="who_is_here">
      There are {others.count} other user(s) online
    </div>
  );
}

const Header = () => {
  return (
    <div className="container d-flex justify-content-between mt-3 mb-3">
      <a className="navbar-brand" href="/">
        <div className="d-flex">
          <img src={logo} alt="logo" className="mr-2" />
          <div>Todo App</div>
        </div>
      </a>
      <WhoIsHere />
    </div>
  );
};

export default Header;
