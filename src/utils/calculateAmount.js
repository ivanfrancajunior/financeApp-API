export const calculateAmount = (transactionList) => {
  const result = transactionList.reduce((balance, transaction) => {
    if (transaction.type === "income") {
      balance += transaction.amount;
    } else if (transaction.type === "expense") {
      balance -= transaction.amount;
    }

    return balance;
  }, 0);

  return result;
};
