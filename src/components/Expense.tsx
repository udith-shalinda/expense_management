import { API_ROUTES, HTTP_TYPES } from '@/utils/constants';
import { useMutation } from '@/hooks/useMutate';

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

type TExpenseListProps = {
  expense: TExpense;
  retry: () => void;
};

const Expense: React.FC<TExpenseListProps> = ({ expense, retry }) => {
  const { mutate: deleteExpense } = useMutation({
    url: API_ROUTES.EXPENSES.DELETE.replace('[id]', expense?._id),
  });

  const handleDelete = async () => {
    const res = await deleteExpense({}, HTTP_TYPES.DELETE);
    if (res.success) {
      retry();
    } else {
      alert('Something went wrong!!');
    }
  };
  return (
    <li
      key={expense._id}
      className='bg-white shadow-md rounded-lg p-4 flex justify-between items-center'
    >
      <div className='flex-1'>
        <p className='text-lg font-medium text-gray-900'>{expense.description}</p>
        <p className='text-sm text-gray-600'>Amount: {expense.amount} LKR</p>
        <p className='text-sm text-gray-600'>Type: {expense.type.name}</p>
        <p className='text-sm text-gray-600'>Date: {new Date(expense.date).toLocaleDateString()}</p>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => handleDelete()} // Call delete function here
        className='ml-auto text-red-500 hover:text-red-700 focus:outline-none'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </li>
  );
};

export default Expense;
