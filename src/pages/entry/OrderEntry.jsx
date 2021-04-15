import { options } from "app-constants";
import Options from "./Options";

export default function OrderEntry() {
  return (
    <>
      <Options optionType={options.scoops} />
      <Options optionType={options.toppings} />
    </>
  );
}
