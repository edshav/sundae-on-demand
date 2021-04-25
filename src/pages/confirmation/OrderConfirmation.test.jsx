import { rest } from "msw";
import { server } from "mocks/server";
import { baseUrl } from "api/localApi";
import OrderConfirmation from "./OrderConfirmation";
import { renderWithContext, screen } from "test-utils/testing-library-utils";

test("server error on order confirmation page", async () => {
  server.resetHandlers(
    rest.post(`${baseUrl}/order`, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderWithContext(<OrderConfirmation setPageToEntry={jest.fn()} />);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/an unexpected error occurred/i);
});
