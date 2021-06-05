import React from "react";

import Card from "../components/UI/Card";
import ProductItemDetail from "../components/Shop/ProductItemDetail";
import classes from "./ProductDetail.module.css";

const ProductDetail = (props) => {
  return (
    <Card className={classes.productDetail}>
      <h2>รายละเอียดสินค้า</h2>
      <div>
        <ProductItemDetail />
      </div>
    </Card>
  );
};

export default ProductDetail;
