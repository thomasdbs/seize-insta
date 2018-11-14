import React, { Component } from "react";

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
            <a href="/">Citation</a>
          </li>
          <li className="nav-link">
            <a href="/photo">Photo</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Menu;
