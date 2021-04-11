import { render, screen, waitFor } from "@testing-library/react";
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
  const unvisiblePopover = screen.getByText(
    /no ice cream will actually be delivered/i
  );
  expect(unvisiblePopover).not.toBeVisible();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  await waitFor(() => {
    const visiblePopover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(visiblePopover).toBeVisible();
  });

  userEvent.unhover(termsAndConditions);
  await waitFor(() => {
    const unvisiblePopoverAgain = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(unvisiblePopoverAgain).not.toBeVisible();
  });
});
