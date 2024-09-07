import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@/hooks/useQuery';
import { API_ROUTES } from '@/utils/constants';

export type TExpense = {
  _id: string;
  description: string;
  amount: number;
  type: {
    _id: string;
    name: string;
  };
  date: string;
};

type TExpenseListProps = { expenses?: TExpense[]; loading: boolean };

const ExpenseList: React.FC<TExpenseListProps> = ({ expenses, loading }) => {
  return (
    <div className='container mx-auto p-4'>
      <ul className='space-y-4'>
        {!loading && Array.isArray(expenses) && expenses.length > 0
          ? expenses.map((expense) => (
              <li
                key={expense._id}
                className='bg-white shadow-md rounded-lg p-4 flex justify-between items-center'
              >
                <div className='flex-1'>
                  <p className='text-lg font-medium text-gray-900'>{expense.description}</p>
                  <p className='text-sm text-gray-600'>Amount: {expense.amount} LKR</p>
                  <p className='text-sm text-gray-600'>Type: {expense.type.name}</p>
                  <p className='text-sm text-gray-600'>
                    Date: {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))
          : !loading && (
              <h2 className='text-center text-lg font-semibold text-gray-700'>
                No Records Available
              </h2>
            )}

        {loading && (
          <h2 className='text-center text-lg font-semibold text-blue-500'>Loading....</h2>
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;
