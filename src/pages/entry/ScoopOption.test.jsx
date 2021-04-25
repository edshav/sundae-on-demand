import userEvent from "@testing-library/user-event";
import { render, screen } from "test-utils/testing-library-utils";
import ScoopOption from "./ScoopOption";

test("scoop input becomes red when amount less than 0 or more than 10", () => {
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

  const vanillaInput = screen.getByRole("spinbutton");
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveAttribute("aria-invalid", "true");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveAttribute("aria-invalid", "true");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "11");
  expect(vanillaInput).toHaveAttribute("aria-invalid", "true");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveAttribute("aria-invalid", "true");
});
