import { useState } from "react";
import axios from "axios";

interface ExpenseFormProps {
  onSubmit: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const [expense, setExpense] = useState({
    description: "",
    amount: 0,
    date: "",
    type: "",
  });

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/expenses", expense);
    onSubmit();
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <input
        type="text"
        placeholder="Description"
        onChange={(e) =>
          setExpense({ ...expense, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setExpense({ ...expense, amount: +e.target.value })}
      />
      <input
        type="date"
        onChange={(e) => setExpense({ ...expense, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Type"
        onChange={(e) => setExpense({ ...expense, type: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ExpenseForm;
