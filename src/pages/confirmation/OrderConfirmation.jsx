import { useEffect, useState } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useOrderDetails } from "contexts/OrderDetails";
import { localApi } from "api/localApi";

function OrderConfirmation({ setPageToEntry }) {
  const [, , resetItemCount] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    localApi
      .post("/order")
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch((error) => {
        // TODO: handle error here
      });
  }, []);

  const onCreateNewOrder = () => {
    resetItemCount();
    setPageToEntry();
  };
  return !orderNumber ? (
    <>Loading...</>
  ) : (
    <>
      <Heading as="h1">Thank you!</Heading>
      <Text>Your order number is {orderNumber}</Text>
      <Button onClick={onCreateNewOrder}>Create new order</Button>
    </>
  );
}

export default OrderConfirmation;
