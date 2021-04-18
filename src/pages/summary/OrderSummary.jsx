import { Heading, UnorderedList, ListItem } from "@chakra-ui/react";
import { useOrderDetails } from "contexts/OrderDetails";
import SummaryForm from "./SummaryForm";

export default function OrderSummary({ setPageToConfirmation }) {
  const [orderDetails] = useOrderDetails();
  return (
    <>
      <Heading as="h1">Order summary</Heading>
      <Heading as="h2">Scoops: {orderDetails.totals.scoops}</Heading>
      <UnorderedList aria-label="scoops">
        {Array.from(orderDetails.scoops).map(([name, amount]) => (
          <ListItem key={name}>{`${amount} ${name}`}</ListItem>
        ))}
      </UnorderedList>
      <Heading as="h2">Toppings: {orderDetails.totals.toppings}</Heading>
      <UnorderedList aria-label="toppings">
        {Array.from(orderDetails.toppings).map(([name, amount]) => (
          <ListItem key={name}>{name}</ListItem>
        ))}
      </UnorderedList>
      <Heading as="h2">Total: {orderDetails.totals.grandTotal}</Heading>
      <SummaryForm setPageToConfirmation={setPageToConfirmation} />
    </>
  );
}
