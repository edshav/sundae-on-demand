import { useState } from "react";
import { Container } from "@chakra-ui/react";
import { OrderDetailsProvider } from "contexts/OrderDetails";
import { appPages } from "app-constants";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderConfirmation from "pages/confirmation/OrderConfirmation";

function App() {
  const [currentPage, setCurrentPage] = useState(appPages.orderEntry1);
  const setPageToEntry = () => {
    setCurrentPage(appPages.orderEntry1);
  };
  const setPageToSummary = () => {
    setCurrentPage(appPages.orderSummary2);
  };
  const setPageToConfirmation = () => {
    setCurrentPage(appPages.orderConfirmation3);
  };

  let CurrentComponent = <OrderEntry setPageToSummary={setPageToSummary} />;
  switch (currentPage) {
    case appPages.orderEntry1:
      CurrentComponent = <OrderEntry setPageToSummary={setPageToSummary} />;
      break;
    case appPages.orderSummary2:
      CurrentComponent = (
        <OrderSummary setPageToConfirmation={setPageToConfirmation} />
      );
      break;
    case appPages.orderConfirmation3:
      CurrentComponent = <OrderConfirmation setPageToEntry={setPageToEntry} />;
      break;
    default:
      throw new Error(`${currentPage} not exists`);
  }

  return (
    <Container maxWidth="90ch" py={12}>
      <OrderDetailsProvider>{CurrentComponent}</OrderDetailsProvider>
    </Container>
  );
}

export default App;
