'use client';
import { withAuth } from '@/hoc/withAuth/withAuth';
import ExpenseForm from '../../../components/ExpenseForm';

const AddExpense = () => {
  return (
    <div>
      <ExpenseForm />
    </div>
  );
};

export default withAuth(AddExpense);
