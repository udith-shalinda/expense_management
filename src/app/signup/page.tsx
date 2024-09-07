'use client';
import { withUnAuth } from '@/hoc/withUnauth/withUnauth';
import AuthForm from '../../components/AuthForm';

const Signup = () => {
  return (
    <div>
      <AuthForm mode='signup' />
    </div>
  );
};

export default withUnAuth(Signup);
