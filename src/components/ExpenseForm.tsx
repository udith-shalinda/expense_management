import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@/hooks/useMutate';
import { API_ROUTES } from '@/utils/constants';
import { useQuery } from '@/hooks/useQuery';
import { useState } from 'react';

export interface IType {
  _id: string;
  name: string;
}

const ExpenseForm: React.FC = () => {
  const { loading, mutate } = useMutation({ url: API_ROUTES.EXPENSES.CREATE });
  const { loading: loadingTypes, data } = useQuery({ url: API_ROUTES.TYPES.ALL });
  const [popup, setPopup] = useState({ show: false, message: '', success: false });

  const validationSchema = Yup.object({
    description: Yup.string().required('Required'),
    amount: Yup.number().required('Required').min(1, 'Amount must be a positive number'),
    date: Yup.date().required('Required'),
    type: Yup.string().required('Required'),
  });

  const handleSubmit = async (
    values: {
      description: string;
      amount: number;
      date: string;
      type: string;
    },
    { resetForm }: any,
  ) => {
    const res = await mutate(values);
    if (res.success) {
      setPopup({ show: true, message: 'Expense submitted successfully!', success: true });
      resetForm(); // Reset the form on success
    } else {
      setPopup({
        show: true,
        message: 'Failed to submit expense. Please try again.',
        success: false,
      });
    }

    setTimeout(() => {
      closePopup();
    }, 2000);
  };

  const closePopup = () => {
    setPopup({ show: false, message: '', success: false });
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      {popup.show && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className={`bg-white p-4 rounded shadow-md relative ${
              popup.success ? 'border-green-500' : 'border-red-500'
            } border-l-4`}
          >
            <p
              className={`text-lg font-semibold ${
                popup.success ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {popup.message}
            </p>
            {/* Close Icon */}
            <button
              onClick={closePopup}
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none'
            >
              &#x2715; {/* Close icon (X) */}
            </button>
          </div>
        </div>
      )}
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h1 className='text-center bold text-xl'>Add Expense</h1>
        <Formik
          initialValues={{
            description: '',
            amount: 1,
            date: '',
            type: Array.isArray(data) ? data[0]._id : '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className='space-y-4'>
              <div>
                <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <Field
                  type='text'
                  name='description'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
                <ErrorMessage
                  name='description'
                  component='div'
                  className='text-red-500 text-sm mt-1'
                />
              </div>
              <div>
                <label htmlFor='amount' className='block text-sm font-medium text-gray-700'>
                  Amount
                </label>
                <Field
                  type='number'
                  name='amount'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
                <ErrorMessage name='amount' component='div' className='text-red-500 text-sm mt-1' />
              </div>
              <div>
                <label htmlFor='date' className='block text-sm font-medium text-gray-700'>
                  Date
                </label>
                <Field
                  type='date'
                  name='date'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
                <ErrorMessage name='date' component='div' className='text-red-500 text-sm mt-1' />
              </div>
              <div>
                <label htmlFor='type' className='block text-sm font-medium text-gray-700'>
                  Type
                </label>
                <Field
                  as='select'
                  name='type'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                >
                  {Array.isArray(data) &&
                    data?.map((type: IType) => (
                      <option key={type._id} value={type._id} label={type.name} />
                    ))}
                </Field>
                <ErrorMessage name='type' component='div' className='text-red-500 text-sm mt-1' />
              </div>
              <button
                type='submit'
                className='w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
                disabled={loading || loadingTypes}
              >
                {loading && loadingTypes ? 'Loading...' : 'Add Expense'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ExpenseForm;
