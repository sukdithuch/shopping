import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../components/UI/Card";
import classes from "./Checkout.module.css";
import { cartActions } from "../store/cart-slice";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;
const isTenChars = (value) => value.trim().length === 10;

const Checkout = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [formInput, setFormInput] = useState({
    name: true,
    address: true,
    city: true,
    state: true,
    postalCode: true,
    phoneNum: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const stateInputRef = useRef();
  const postalCodeInputRef = useRef();
  const phoneNumInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enterdName = nameInputRef.current.value;
    const enterdAddress = addressInputRef.current.value;
    const enterdCity = cityInputRef.current.value;
    const enterdState = stateInputRef.current.value;
    const enterdPostalCode = postalCodeInputRef.current.value;
    const enterdPhoneNum = phoneNumInputRef.current.value;

    const enterdNameValid = !isEmpty(enterdName);
    const enterdAddressValid = !isEmpty(enterdAddress);
    const enterdCityValid = !isEmpty(enterdCity);
    const enterdStateValid = !isEmpty(enterdState);
    const enterdPostalCodeValid = isFiveChars(enterdPostalCode);
    const enterdPhoneNumValid = isTenChars(enterdPhoneNum);

    setFormInput({
      name: enterdNameValid,
      address: enterdAddressValid,
      city: enterdCityValid,
      state: enterdStateValid,
      postalCode: enterdPostalCodeValid,
      phoneNum: enterdPhoneNumValid,
    });

    const formIsValid =
      enterdNameValid &&
      enterdAddressValid &&
      enterdCityValid &&
      enterdStateValid &&
      enterdPostalCodeValid &&
      enterdPhoneNumValid;

    if (!formIsValid) {
      return;
    }

    submitOrder({
      name: enterdName,
      address: enterdAddress,
      city: enterdCity,
      state: enterdState,
      postalCode: enterdPostalCode,
      phoneNum: enterdPhoneNum,
    });
  };

  const submitOrder = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://shopping-server-sql.herokuapp.com/api/user/order",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartItems,
        }),
        headers: {
          'Content-Type': 'application/json',
        },        
      })
//       .then((response) => {
//         console.log(response);
//       })
      .then(response => response.json())
      .then(result => {
         console.log('Success:', result);
        })
      .catch(error => {
          console.error('Error:', error);
        });
      

    setIsSubmitting(false);
    setDidSubmit(true);
    clearDataCart();
  };

  const clearDataCart = () => {
    dispatch(cartActions.clearCart());
  };

  const nameControlClasses = `${classes.control} ${
    formInput.name ? "" : classes.invalid
  }`;
  const addressControlClasses = `${classes.control} ${
    formInput.address ? "" : classes.invalid
  }`;
  const cityCodeControlClasses = `${classes.control} ${
    formInput.city ? "" : classes.invalid
  }`;
  const stateControlClasses = `${classes.control} ${
    formInput.state ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInput.postalCode ? "" : classes.invalid
  }`;
  const phoneNumControlClasses = `${classes.control} ${
    formInput.phoneNum ? "" : classes.invalid
  }`;

  const formModalContent = (
    <React.Fragment>
      <form onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
          <label htmlFor="name">ชื่อ - นามสกุล</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formInput.name && <p>กรุณาใส่ชื่อและนามสกุล!</p>}
        </div>
        <div className={addressControlClasses}>
          <label htmlFor="address">ที่อยู่</label>
          <input type="text" id="address" ref={addressInputRef} />
          {!formInput.address && <p>กรุณาใส่ที่อยู่!</p>}
        </div>
        <div className={cityCodeControlClasses}>
          <label htmlFor="city">อำเภอ</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formInput.city && <p>กรุณาใส่อำเภอ!</p>}
        </div>
        <div className={stateControlClasses}>
          <label htmlFor="state">จังหวัด</label>
          <input type="text" id="state" ref={stateInputRef} />
          {!formInput.state && <p>กรุณาใส่จังหวัด!</p>}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor="postal">รหัสไปรษณีย์</label>
          <input type="text" id="postal" ref={postalCodeInputRef} />
          {!formInput.postalCode && <p>กรุณาใส่รหัสไปรษณีย์!</p>}
        </div>
        <div className={phoneNumControlClasses}>
          <label htmlFor="phone">เบอร์โทรศัพท์</label>
          <input type="text" id="phone" ref={phoneNumInputRef} />
          {!formInput.phoneNum && <p>กรุณาใส่เบอร์โทรศัพท์!</p>}
        </div>
        <div className={classes.btn}>
          <Link to="/cart">
            <button type="button" className={classes.cancle}>
              ยกเลิก
            </button>
          </Link>
          <button className={classes.submit}>ตกลง</button>
        </div>
      </form>
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div>
        <Link to="/">
          <button>ปิด</button>
        </Link>
      </div>
    </React.Fragment>
  );

  return (
    <Card className={classes.checkout}>
      {!isSubmitting && !didSubmit && formModalContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Card>
  );
};

export default Checkout;
