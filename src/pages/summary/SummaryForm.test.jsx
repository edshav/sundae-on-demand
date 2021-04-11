import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "./SummaryForm";

test("initial condition", () => {
  render(<SummaryForm />);
  const agreeCheckbox = screen.getByRole("checkbox", {
    name: /terms and Conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(agreeCheckbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("should disabled confirm button when checkbox is not checked", () => {
  render(<SummaryForm />);
  const agreeCheckbox = screen.getByRole("checkbox", {
    name: /terms and Conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  userEvent.click(agreeCheckbox);
  expect(confirmButton).toBeEnabled();
  userEvent.click(agreeCheckbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  await screen.findByText(/no ice cream will actually be delivered/i);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
