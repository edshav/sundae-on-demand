import OrderSummary from "./pages/summary/OrderSummary";
import Options from "./pages/entry/Options";

function App() {
  return (
    <div>
      <OrderSummary />
      <Options optionsType="scoops" />
    </div>
  );
}

export default App;
