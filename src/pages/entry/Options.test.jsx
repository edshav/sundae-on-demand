import { renderWithContext, screen } from "test-utils/testing-library-utils";
import { options } from "app-constants";
import Options from "./Options";
import userEvent from "@testing-library/user-event";

test("display image for each scoop option from server", async () => {
  renderWithContext(<Options optionType={options.scoops} />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // @ts-ignore
  const altText = scoopImages.map((el) => el.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each toppings option from server", async () => {
  renderWithContext(<Options optionType={options.toppings} />);
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

test("no scoops subtotal update for invalid scoop count", async () => {
  renderWithContext(<Options optionType={options.scoops} />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3");

  const scoopsSubtotal = screen.getByText(/scoops total:/i);
  expect(scoopsSubtotal).toHaveTextContent("6.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "-1");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
