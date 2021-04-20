import H2Heading from "shared/H2Heading";
import { useOrderDetails } from "contexts/OrderDetails";

export default function GrandTotal() {
  const [orderDetails] = useOrderDetails();
  return (
    <H2Heading my={12}>Grand total: {orderDetails.totals.grandTotal}</H2Heading>
  );
}
