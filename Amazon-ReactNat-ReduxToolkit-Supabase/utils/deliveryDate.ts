export const deliveryDate = (deliveryDate: number) => {
  const date = new Date();
  date.setDate(date.getDate() + deliveryDate);
  return date.toDateString().slice(0, 10);
};
