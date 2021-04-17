import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { options, pricePerItem } from "app-constants";

// format number as currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

// @ts-ignore
const OrderDetails = createContext();

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    [options.scoops]: new Map(),
    [options.toppings]: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    [options.scoops]: zeroCurrency,
    [options.toppings]: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal(options.scoops, optionCounts);
    const toppingsSubtotal = calculateSubtotal(options.toppings, optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      [options.scoops]: formatCurrency(scoopsSubtotal),
      [options.toppings]: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      setOptionCounts((prevState) => {
        // get option Map and make a copy
        const { [optionType]: optionMap } = prevState;
        const newOptionMap = new Map(optionMap);

        // update the copied Map
        newOptionMap.set(itemName, parseInt(newItemCount));

        // create new object with the old optionCounts plus new map
        const newOptionCounts = { ...prevState };
        newOptionCounts[optionType] = newOptionMap;

        return newOptionCounts;
      });
    }
    // getter: object containing option counts for scoops and toppings, subtotal
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}
