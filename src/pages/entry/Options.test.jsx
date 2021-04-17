import { render, screen } from "@testing-library/react";
import { options } from "app-constants";
import { OrderDetailsProvider } from "contexts/OrderDetails";
import Options from "./Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType={options.scoops} />, {
    wrapper: OrderDetailsProvider,
  });

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // @ts-ignore
  const altText = scoopImages.map((el) => el.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each toppings option from server", async () => {
  render(<Options optionType={options.toppings} />, {
    wrapper: OrderDetailsProvider,
  });
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // @ts-ignore
  const altText = toppingImages.map((el) => el.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
