'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../useRedux';
import { ROUTES } from '@/utils/constants';

export function withUnAuth<P>(WrappedComponent: React.ComponentType<any>) {
  const VisibityControlled: React.FC = (props) => {
    const { authenticated } = useAppSelector((store: any) => store.user);
    const router = useRouter();
    const [permission, setPermission] = useState(false);

    useEffect(() => {
      checkPermission();
    }, [authenticated]);

    const checkPermission = () => {
      if (authenticated === true) {
        router.push(ROUTES.DASHBOARD);
        return;
      }
      if (authenticated === false) {
        setPermission(true);
      }
    };

    return (
      <div>
        {permission ? (
          <WrappedComponent {...props} />
        ) : (
          <div className='h-screen flex'>
            <div className='m-auto'>loading....</div>
          </div>
        )}
      </div>
    );
  };

  return VisibityControlled;
}
