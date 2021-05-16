import React from "react";
import { useDispatch } from "react-redux";

import { uiActions } from "../../store/ui-slice";
import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const dispatch = useDispatch();

  const homeHandler = () => {
    dispatch(uiActions.close());
  };

  return (
    <header className={classes.header}>
      <button className={classes.btn} onClick={homeHandler}>
        SHOPPING
      </button>
      <nav>
        <ul>
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
