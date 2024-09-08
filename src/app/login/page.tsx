'use client';
import { withUnAuth } from '@/hoc/withUnauth/withUnauth';
import AuthForm from '../../components/AuthForm';
import { checkUser } from '@/store/user';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

const Login = () => {
  const dispatch = useAppDispatch();
  const { authenticated } = useAppSelector((store: any) => store.user);

  useEffect(() => {
    !authenticated && dispatch(checkUser());
  }, [authenticated, dispatch]);

  return (
    <div>
      <AuthForm mode='login' />
    </div>
  );
};

export default withUnAuth(Login);
