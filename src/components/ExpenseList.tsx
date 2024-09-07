import { useEffect, useState } from "react";
import axios from "axios";

type TExpense = {
  _id: string;
  description: string;
  amount: number;
  type: number;
  date: string;
};

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<TExpense[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/expenses")
      .then((res) => setExpenses(res.data));
  }, []);

  return (
    <div>
      <h2>Your Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.description} - {expense.amount} LKR - {expense.type} -{" "}
            {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
