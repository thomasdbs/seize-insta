import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  toggleNavbar = () => {
    document.querySelector("nav").classList.toggle("active");
  };
  render() {
    return (
      <nav>
        <button className="icon" onClick={() => this.toggleNavbar()} />
        <ul>
          <li className="nav-link">
            <Link to="/">Citation</Link>
          </li>
          <li className="nav-link">
            <Link to="/photo">Photo</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Menu;
