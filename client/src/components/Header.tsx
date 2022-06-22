import logo from "./assets/logo.png";

const Header = () => {
  return (
    <div className="container">
      <a className="navbar-brand" href="/">
        <div className="d-flex">
          <img src={logo} alt="logo" className="mr-2" />
          <div>Todo App</div>
        </div>
      </a>
    </div>
  );
};

export default Header;
