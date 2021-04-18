import { Heading } from "@chakra-ui/react";
import { useOrderDetails } from "contexts/OrderDetails";

export default function GrandTotal() {
  const [orderDetails] = useOrderDetails();
  return (
    <Heading as="h2">Grand total: {orderDetails.totals.grandTotal}</Heading>
  );
}
