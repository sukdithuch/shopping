import React from "react";
import { NavLink, Link } from "react-router-dom";

import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <NavLink to="/" className={classes.logo}>
        SHOPPING
      </NavLink>
      <nav>
        <ul>
          <li>
            <Link to="/cart">
              <CartButton />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
