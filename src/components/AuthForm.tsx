import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@/hooks/useMutate';
import { ACCESS_TOKEN, API_ROUTES, ROUTES } from '@/utils/constants';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { mutate, loading } = useMutation({
    url: mode === 'login' ? API_ROUTES.USER.LOGIN : API_ROUTES.USER.SIGN_UP,
  });
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    { setFieldError }: any,
  ) => {
    try {
      const response = await mutate(values);
      localStorage.setItem(ACCESS_TOKEN, response.data.token);

      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      setFieldError('email', 'Invalid Credentials');
      setFieldError('password', 'Invalid Credentials');
      alert(`${mode === 'login' ? 'Login' : 'Signup'} failed`);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>{mode === 'login' ? 'Login' : 'Signup'}</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className='space-y-4'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <Field
                  type='email'
                  name='email'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
                <ErrorMessage name='email' component='div' className='text-red-500 text-sm mt-1' />
              </div>
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <Field
                  type='password'
                  name='password'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-red-500 text-sm mt-1'
                />
              </div>
              <button
                type='submit'
                className='w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
              >
                {loading ? 'Logging in...' : mode === 'login' ? 'Login' : 'Sign up'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
