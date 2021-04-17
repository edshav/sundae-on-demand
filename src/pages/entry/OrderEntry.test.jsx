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

  renderWithContext(<OrderEntry />);

  await waitFor(() => {
    const alerts = screen.getAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
