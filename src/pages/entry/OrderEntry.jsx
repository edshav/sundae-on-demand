import { options } from "app-constants";
import Options from "./Options";
import GrandTotal from "./GrandTotal";
import { Button } from "@chakra-ui/button";

export default function OrderEntry({ setPageToSummary }) {
  return (
    <>
      <Options optionType={options.scoops} />
      <Options optionType={options.toppings} />
      <GrandTotal />
      <Button onClick={setPageToSummary}>Order</Button>
    </>
  );
}
