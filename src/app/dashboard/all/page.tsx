'use client';
import { useEffect, useState } from 'react';
import Expense, { TExpense } from '../../../components/Expense';
import { useQuery } from '@/hooks/useQuery';
import { API_ROUTES } from '@/utils/constants';
import { withAuth } from '@/hoc/withAuth/withAuth';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { IType, loadTypes } from '@/store/types';

const ViewExpenses = () => {
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { loaded: typesLoaded, types } = useAppSelector((store) => store.types);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    const timeOut = setTimeout(() => {
      selectedType && retry();
    }, 500);

    return () => {
      timeOut && clearTimeout(timeOut);
    };
  }, [selectedType, searchQuery]);

  useEffect(() => {
    Array.isArray(types) && setSelectedType(types[0]._id);
  }, [types]);

  useEffect(() => {
    !typesLoaded && dispatch(loadTypes());
  }, []);

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
              types?.map((type: IType) => (
                <option key={type._id} value={type._id} label={type.name} />
              ))}
          </select>
        </div>
      </div>

      <div className='container mx-auto p-4'>
        <ul className='space-y-4'>
          {!loading && Array.isArray(expenses) && expenses.length > 0
            ? expenses.map((expense: TExpense) => (
                <Expense key={expense._id} expense={expense} retry={retry} />
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
    </div>
  );
};

export default withAuth(ViewExpenses);
