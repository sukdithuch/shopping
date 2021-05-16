import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../UI/Card";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { uiActions } from "../../store/ui-slice";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const showProductHandler = () => {
    dispatch(uiActions.close());
  };

  const totalPriceItems = cartItems.reduce(
    (sumItem, Item) => sumItem + Item.quantity * Item.price,
    0
  );

  return (
    <Card className={classes.cart}>
      <h2>ตะกร้าสินค้า</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
      <h1>ราคาทั้งหมด {totalPriceItems} บาท</h1>
      <button onClick={showProductHandler}>กลับไปหน้าสินค้า</button>
    </Card>
  );
};

export default Cart;
