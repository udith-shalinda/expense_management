'use client';
import ExpenseForm from '../../../components/ExpenseForm';

const AddExpense = () => {
  return (
    <div>
      <ExpenseForm onSubmit={() => alert('Expense added')} />
    </div>
  );
};

export default AddExpense;
