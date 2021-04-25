import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useOrderDetails } from "contexts/OrderDetails";
import { localApi } from "api/localApi";
import H1Heading from "shared/H1Heading";
import PrimaryButton from "shared/PrimaryButton";
import AlertBanner from "shared/AlertBanner";

function OrderConfirmation({ setPageToEntry }) {
  const [, , resetItemCount] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    localApi
      .post("/order")
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  const onCreateNewOrder = () => {
    resetItemCount();
    setPageToEntry();
  };

  if (isError) return <AlertBanner />;
  if (!orderNumber) return <>Loading...</>;

  return (
    <Box textAlign="center">
      <H1Heading textAlign="center">Thank you!</H1Heading>
      <Text textAlign="center">
        Your order number is{" "}
        <Text as="span" fontWeight="bold">
          {orderNumber}
        </Text>
      </Text>
      <Text textAlign="center" my={8}>
        as per our terms and conditions, nothing will happen now
      </Text>
      <PrimaryButton onClick={onCreateNewOrder}>Create new order</PrimaryButton>
    </Box>
  );
}

export default OrderConfirmation;
