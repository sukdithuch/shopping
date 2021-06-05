import React from "react";
import { Link } from "react-router-dom";

import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { title, imgUrl, price, id } = props;

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
        <Link
          to={{
            pathname: `/products/${id}`,
            state: { product: props },
          }}
        >
          <button>รายละเอียด</button>
        </Link>
      </Card>
    </div>
  );
};

export default ProductItem;
