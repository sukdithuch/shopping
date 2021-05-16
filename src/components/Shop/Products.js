import React from "react";

import Data from "../../Data";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const { DATA_PRODUCTS } = Data;

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>สินค้าทั้งหมด</h2>
      <div>
        {DATA_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.name}
            imgUrl={product.img_url}
            price={product.price}
            detail={product.detail}
            category={product.category}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;
