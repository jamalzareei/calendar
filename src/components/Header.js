import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/calendar">
              Calendar
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="/calendar-expert">
              Calendar Expert
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/calendar-client">
              Calendar client
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
