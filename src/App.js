import { Container } from "@chakra-ui/react";
import { OrderDetailsProvider } from "contexts/OrderDetails";
// import OrderSummary from "./pages/summary/OrderSummary";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <Container maxWidth="90ch">
      <OrderDetailsProvider>
        <OrderEntry />
        {/* <OrderSummary /> */}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
