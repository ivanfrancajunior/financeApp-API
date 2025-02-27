export const calculateAmount = async (items) => {
  const result = items.reduce((balance, transaction) => {
    if (transaction.type === "income") {
      balance += transaction.amount;
    } else if (transaction.type === "expense") {
      balance -= transaction.amount;
    }
    return balance;
  }, 0);

  return result;
};
