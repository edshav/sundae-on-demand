import {
  renderWithContext,
  render,
  screen,
  within,
} from "test-utils/testing-library-utils";

import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render App
  renderWithContext(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3");
  const hotfudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  const mnmsCheckbox = screen.getByRole("checkbox", {
    name: "M&Ms",
  });
  const cherriesToppingCheckbox = screen.getByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(hotfudgeCheckbox);
  userEvent.click(mnmsCheckbox);
  userEvent.click(cherriesToppingCheckbox);

  // find and click order button
  const orderButton = await screen.findByRole("button", { name: /order/i });
  userEvent.click(orderButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsSubtotal = screen.getByRole("heading", {
    name: /scoops:/i,
  });
  expect(scoopsSubtotal).toHaveTextContent("$6.00");

  const scoopsList = screen.getByRole("list", { name: /scoops/i });
  const { getAllByRole: getAllByRoleWithinScoops } = within(scoopsList);
  const scoopsItems = getAllByRoleWithinScoops("listitem");
  const scoopsItemTexts = scoopsItems.map((item) => item.textContent);
  expect(scoopsItemTexts).toEqual(["3 Vanilla"]);

  const toppingsSubtotal = screen.getByRole("heading", {
    name: /toppings:/i,
  });
  expect(toppingsSubtotal).toHaveTextContent("$4.50");

  const toppingsList = screen.getByRole("list", { name: /toppings/i });
  const { getAllByRole: getAllByRoleWithinToppings } = within(toppingsList);
  const toppingItems = getAllByRoleWithinToppings("listitem");
  const toppingsItemTexts = toppingItems.map((item) => item.textContent);
  expect(toppingsItemTexts).toEqual(["Hot fudge", "M&Ms", "Cherries"]);

  const grandTotal = await screen.findByRole("heading", { name: /total/i });
  expect(grandTotal).toHaveTextContent("$10.50");

  // accept terms and conditions and click button to confirm order
  const termsAndConditions = await screen.findByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = await screen.findByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(termsAndConditions);
  userEvent.click(confirmButton);

  // expect "Loading" to show
  const loading = await screen.findByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();
  const loadingAgain = screen.queryByText(/loading/i);
  expect(loadingAgain).not.toBeInTheDocument();

  const orderNumber = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumber).toHaveTextContent("1234567890");

  // click "new order" button on confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = await screen.findByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // wait for items to appear so that Testing Library doesn't get angry about
  // happing after test is over
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});

test("conditional toppings section on summary page", async () => {
  render(<App />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");

  const orderButton = screen.getByRole("button", { name: /order/i });
  userEvent.click(orderButton);

  const toppingsTotal = screen.queryByRole("heading", {
    name: /toppings:/i,
  });
  expect(toppingsTotal).not.toBeInTheDocument();
});
