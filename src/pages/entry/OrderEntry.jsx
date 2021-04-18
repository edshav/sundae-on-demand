import { options } from "app-constants";
import Options from "./Options";
import GrandTotal from "./GrandTotal";

export default function OrderEntry() {
  return (
    <>
      <Options optionType={options.scoops} />
      <Options optionType={options.toppings} />
      <GrandTotal />
    </>
  );
}
