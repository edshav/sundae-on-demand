import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "contexts/OrderDetails";

export const renderWithContext = (ui, props) =>
  render(ui, { wrapper: OrderDetailsProvider, ...props });

export * from "@testing-library/react";
