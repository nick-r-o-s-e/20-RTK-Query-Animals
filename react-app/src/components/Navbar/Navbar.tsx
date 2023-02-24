import { NavLink } from "react-router-dom";
import "./Navbar.scss";

interface Props {
  navArrow: Boolean;
}

function Navbar({ navArrow }: Props) {
  return (
    <nav className="navbar fixed-top navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/"}>
          ANIMALS
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse auto"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Animals
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/animals/Mammals">
                    Mammals
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/animals/Reptiles">
                    Reptiles
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/animals/Birds">
                    Birds
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/animals/Amphibians">
                    Amphibians
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/animals/Fishes">
                    Fishes
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/animals/Insects">
                    Insects
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/animals" end>
                    All
                  </NavLink>
                </li>
              </ul>
            </li>

            <li id="new-animal" className="nav-item">
              <NavLink className="nav-link" to={"/new-animal"}>
                New Animal
              </NavLink>
              {navArrow && <i className="fa-solid fa-arrow-up nav-arrow"></i>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
