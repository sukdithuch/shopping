import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart-slice";
import classes from "./ProductItemDetail.module.css";

const ProductItemDetail = (props) => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const { title, price, id } = state.product;

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
    <div className={classes.itemDetail}>
      <div>
        <img src={state.product.imgUrl} alt={state.product.title} />
      </div>
      <div>
        <h1>{state.product.title}</h1>
        <p>{state.product.detail}</p>
        <h3>ราคา {state.product.price} บาท</h3>
      </div>
      <div className={classes.btn}>
        <button onClick={addItem} className={classes.add}>
          เพิ่มในตะกร้า
        </button>
        <Link to="/">
          <button>กลับไปหน้าสินค้า</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductItemDetail;
