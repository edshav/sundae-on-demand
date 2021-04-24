import { options } from "app-constants";
import H1Heading from "shared/H1Heading";
import PrimaryButton from "shared/PrimaryButton";
import { useOrderDetails } from "contexts/OrderDetails";
import { formatCurrency } from "utils";
import Options from "./Options";
import GrandTotal from "./GrandTotal";

export default function OrderEntry({ setPageToSummary }) {
  const [{ totals }] = useOrderDetails();

  const orderButtonDisabled = totals[options.scoops] === formatCurrency(0);

  return (
    <>
      <H1Heading textAlign="center">Ice cream</H1Heading>
      <Options optionType={options.scoops} />
      <Options optionType={options.toppings} />
      <GrandTotal />
      <PrimaryButton onClick={setPageToSummary} disabled={orderButtonDisabled}>
        Order
      </PrimaryButton>
    </>
  );
}
