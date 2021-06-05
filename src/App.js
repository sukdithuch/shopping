import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import Layout from "../src/components/Layout/Layout";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";

function App() {
  // const showCart = useSelector((state) => state.ui.cartVisible);
  // const showProduct = useSelector((state) => state.ui.productVisible);
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
        <Switch>
          <Route path="/" exact>
            <Redirect to="/products" />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:productId">
            <ProductDetail />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;
