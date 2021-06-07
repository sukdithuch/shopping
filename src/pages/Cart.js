import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../components/UI/Card";
import CartItem from "../components/Cart/CartItem";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  const totalPriceItems = cartItems.reduce(
    (sumItem, Item) => sumItem + Item.quantity * Item.price,
    0
  );

  const hasItems = cartItems.length > 0;

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
      <Link to="/" className={classes.btn}>
        <button>กลับไปหน้าสินค้า</button>
      </Link>
      {hasItems && (
        <Link
          to={{
            pathname: "/checkout",
          }}
          className={classes.order}
        >
          <button>สั่งซื้อสินค้า</button>
        </Link>
      )}
    </Card>
  );
};

export default Cart;
