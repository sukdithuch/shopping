import React, { useEffect, useState } from "react";

import ProductItem from "../components/Shop/ProductItem";
import classes from "./Products.module.css";


const Products = (props) => {
  const [dataProducts, setDataProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://shopping-7f8a2-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      

      const responseData = await response.json();


      const loadedProducts = [];
      

      for (const key in responseData) {
        loadedProducts.push({
          id: key,
          name: responseData[key].name,
          img_url: responseData[key].img_url,
          price: responseData[key].price,
          detail: responseData[key].detail,
          category: responseData[key].category
        });
      }
      setDataProducts(loadedProducts);
      setIsLoading(false);
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    }); 
  }, []);

  if (isLoading) {
    return (
      <section className={classes.productsLoading}>
        <p>Loading...</p>
      </section>
    );
  };

  if (httpError) {
    return (
      <section className={classes.productsError}>
        <p>{httpError}</p>
      </section>
    );
  };



  return (
    <section className={classes.products}>
      <h2>สินค้าทั้งหมด</h2>
      <div>
        {dataProducts.map((product) => (
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
