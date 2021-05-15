import React from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const { title, imgUrl, price, id } = props;

  const addItem = () => {
    dispatch(
      cartActions.addToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <div className={classes.item}>
      <Card>
        <div>
          <img src={imgUrl} alt={title} />
        </div>
        <header>
          <h1>฿{price.toFixed(2)}</h1>
          <p>{title}</p>
        </header>
        <div>
          <button onClick={addItem}>Add to Cart</button>
        </div>
      </Card>
    </div>
  );
};

export default ProductItem;
