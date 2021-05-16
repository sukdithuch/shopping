import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

import Layout from "../src/components/Layout/Layout";
import Cart from "../src/components/Cart/Cart";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartVisible);
  const showProduct = useSelector((state) => state.ui.productVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch("https://shopping-7f8a2-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Fragment>
      <Layout>
        {showCart && <Cart />}
        {showProduct && <Products />}
      </Layout>
    </Fragment>
  );
}

export default App;
