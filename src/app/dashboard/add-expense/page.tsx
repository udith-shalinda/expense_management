'use client';
import ExpenseForm from '../../../components/ExpenseForm';

const AddExpense = () => {
  return (
    <div>
      <h1>Add Expense</h1>
      <ExpenseForm onSubmit={() => alert('Expense added')} />
    </div>
  );
};

export default AddExpense;
