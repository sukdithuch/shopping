import React from "react";
import { useSelector } from "react-redux";

import classes from "./CartButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartButton = (props) => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <button className={classes.button}>
      <span>
        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
      </span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
