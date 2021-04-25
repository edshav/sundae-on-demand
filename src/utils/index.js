// format number as currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export const isNotNegativeInt = (amount) => {
  const valueFloat = parseFloat(amount);

  return (
    0 <= valueFloat && valueFloat <= 10 && Math.floor(valueFloat) === valueFloat
  );
};
