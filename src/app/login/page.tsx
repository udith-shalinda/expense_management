'use client';
import { withUnAuth } from '@/hoc/withUnauth/withUnauth';
import AuthForm from '../../components/AuthForm';
import { checkUser } from '@/store/user';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hoc/useRedux';

const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <div>
      <AuthForm mode='login' />
    </div>
  );
};

export default withUnAuth(Login);
