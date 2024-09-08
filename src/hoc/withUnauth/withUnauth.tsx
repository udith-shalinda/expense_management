'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import { useAppSelector } from '@/hooks/useRedux';

export function withUnAuth(WrappedComponent: React.ComponentType<any>) {
  const VisibityControlled: React.FC = (props) => {
    const { authenticated } = useAppSelector((store: any) => store.user);
    const router = useRouter();
    const [permission, setPermission] = useState(false);

    useEffect(() => {
      checkPermission();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
