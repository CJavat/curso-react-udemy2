export const formatearDinero = (cantidad) => {
  return cantidad.toString().toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
