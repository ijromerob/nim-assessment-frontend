import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order: { name, address, items }, id }) {
  return (
    <div className={styles.confirmationMessage}>
      <h1>Thank you for your order</h1>
      <div className={styles.orderInformation}>
        <p>Order ID: {id}</p>
        <p>Name: {name}</p>
        <p>Address: {address}</p>
      </div>
      <table className={styles.detailsTable}>
        <thead>
          <tr>
            <th scope="col">Item ID</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.item.id}>
              <td>{item.item.id}</td>
              <td>{item.item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.item.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>TOTAL:</td>
            <td>
              ${" "}
              {(
                items.reduce(
                  (total, item) => total + item.item.price * item.quantity,
                  0
                ) * 1.05
              ).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default OrderConfirmation;
