import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState({
    id: 0,
    name: "",
    address: "",
    items: []
  });

  const getOrder = async () => {
    const response = await fetch(`/api/orders/${id}`);
    const data = await response.json();
    setOrder(data);
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  return (
    <div>
      <OrderConfirmation order={order} />
    </div>
  );
}

export default ConfirmationPage;
