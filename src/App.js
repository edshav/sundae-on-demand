import OrderSummary from "./pages/summary/OrderSummary";
import Options from "./pages/entry/Options";

function App() {
  return (
    <div>
      <OrderSummary />
      <Options optionsType="scoops" />
      <Options optionsType="toppings" />
    </div>
  );
}

export default App;
