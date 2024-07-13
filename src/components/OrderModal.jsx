import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  const placeOrder = async () => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: order
      })
    });
    if (response.status === 200) {
      const data = await response.json();
      navigate(`/order-confirmation/${data.id}`);
    }
  };
  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
                ref={nameRef}
                required
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="tel"
                id="phone"
                pattern="\(\d{3}\) \d{3}-\d{4}"
                placeholder="(XXX) XXX-XXXX"
                ref={phoneRef}
                required
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="text"
                id="address"
                ref={addressRef}
                required
              />
            </label>
          </div>
        </form>
        <div className={styles.incorrectMessage}>
          {!nameRef.current?.checkValidity() && <p>Missing name</p>}
          {!phoneRef.current?.checkValidity() && (
            <p>Invalid phone number format:(XXX) XXX-XXXX</p>
          )}
          {!addressRef.current?.checkValidity() && <p>Missing address</p>}
        </div>
        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              if (
                nameRef.current?.checkValidity() &&
                phoneRef.current?.checkValidity() &&
                addressRef.current?.checkValidity()
              ) {
                placeOrder();
              }
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
