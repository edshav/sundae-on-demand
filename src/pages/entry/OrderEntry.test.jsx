import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "mocks/server";
import { baseUrl } from "api/localApi";
import { options } from "app-constants";
import {
  renderWithContext,
  screen,
  waitFor,
} from "test-utils/testing-library-utils";
import OrderEntry from "./OrderEntry";

test("hendles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get(`${baseUrl}/${options.scoops}`, (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get(`${baseUrl}/${options.toppings}`, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderWithContext(<OrderEntry setPageToSummary={jest.fn()} />);

  await waitFor(() => {
    const alerts = screen.getAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("disable order button if no scoops ordered", async () => {
  renderWithContext(<OrderEntry setPageToSummary={jest.fn()} />);
  const orderButton = screen.getByRole("button", { name: /order/i });
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});
