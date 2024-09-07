'use client';
import { useEffect, useState } from 'react';
import ExpenseList, { TExpense } from '../../../components/ExpenseList';
import { useQuery } from '@/hooks/useQuery';
import { API_ROUTES } from '@/utils/constants';
import { IType } from '@/components/ExpenseForm';

const ViewExpenses = () => {
  const { loading: loadingTypes, data: types } = useQuery({ url: API_ROUTES.TYPES.ALL });
  const [selectedType, setSelectedType] = useState(Array.isArray(types) ? types[0]._id : '');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: expenses,
    loading,
    retry,
  } = useQuery({
    url: `${API_ROUTES.EXPENSES.ALL}?${searchQuery ? 'searchQuery=' + searchQuery : ''}${
      selectedType
        ? searchQuery
          ? '&selectedType=' + selectedType
          : 'selectedType=' + selectedType
        : ''
    }`,
    notFetchOnLoad: true,
  });

  let timeOut: any;

  useEffect(() => {
    timeOut && clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      retry();
    }, 500);

    return () => {
      timeOut && clearTimeout(timeOut);
    };
  }, [selectedType, searchQuery]);

  useEffect(() => {
    Array.isArray(types) && setSelectedType(types[0]._id);
  }, [types]);

  return (
    <div>
      <div className='mb-4 flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 md:space-x-4 mx-auto container px-4'>
        <div className='flex-1'>
          <input
            type='text'
            placeholder='Search by description...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>

        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          >
            {Array.isArray(types) &&
              types?.map((type: IType) => <option value={type._id} label={type.name} />)}
          </select>
        </div>
      </div>
      <ExpenseList loading={loading} expenses={expenses as TExpense[]} />
    </div>
  );
};

export default ViewExpenses;
