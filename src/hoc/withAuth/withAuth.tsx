'use client';
import React, { useEffect, useState } from 'react';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/useRedux';

export function withAuth(WrappedComponent: React.ComponentType<any>, roles?: string[]) {
  const VisibityControlled: React.FC = (props) => {
    const { authenticated, user, loading } = useAppSelector((store: any) => store.user);
    const router = useRouter();
    const [permission, setPermission] = useState(false);

    useEffect(() => {
      checkPermission();
    }, [authenticated, loading]);

    const checkPermission = () => {
      if (authenticated === false) {
        router.push(ROUTES.LOGIN);
        return;
      }
      if (authenticated === true) {
        if (!roles || roles.length === 0) {
          setPermission(true);
          return;
        }

        const authorized = roles?.includes(user?.role.name);

        if (authorized) {
          setPermission(true);
          return;
        }

        router.push(ROUTES.DASHBOARD);
        return;
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
