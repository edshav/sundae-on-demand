import { UnorderedList, ListItem } from "@chakra-ui/react";
import { useOrderDetails } from "contexts/OrderDetails";
import SummaryForm from "./SummaryForm";
import H1Heading from "shared/H1Heading";
import H2Heading from "shared/H2Heading";

export default function OrderSummary({ setPageToConfirmation }) {
  const [orderDetails] = useOrderDetails();
  return (
    <>
      <H1Heading>Order summary</H1Heading>
      <H2Heading py={3}>Scoops: {orderDetails.totals.scoops}</H2Heading>
      <UnorderedList aria-label="scoops">
        {Array.from(orderDetails.scoops).map(([name, amount]) => (
          <ListItem key={name}>{`${amount} ${name}`}</ListItem>
        ))}
      </UnorderedList>
      <H2Heading py={3}>Toppings: {orderDetails.totals.toppings}</H2Heading>
      <UnorderedList aria-label="toppings">
        {Array.from(orderDetails.toppings).map(([name, amount]) => (
          <ListItem key={name}>{name}</ListItem>
        ))}
      </UnorderedList>
      <H2Heading py={3}>Total: {orderDetails.totals.grandTotal}</H2Heading>
      <SummaryForm setPageToConfirmation={setPageToConfirmation} />
    </>
  );
}
