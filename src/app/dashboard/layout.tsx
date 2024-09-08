'use client';
import { useAppDispatch } from '@/hooks/useRedux';
import { logout } from '@/store/user';
import { ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const onLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };
  return (
    <div>
      <nav className='bg-gray-800 text-white p-4'>
        <div className='container mx-auto flex items-center justify-between'>
          <ul className='flex items-center space-x-8'>
            <li>
              <Link
                href='/dashboard'
                className={
                  pathname === ROUTES.DASHBOARD ? 'text-yellow-400' : 'hover:text-yellow-400'
                }
              >
                Dashboard Overview
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/all'
                className={
                  pathname === ROUTES.ALL_EXPENSES ? 'text-yellow-400' : 'hover:text-yellow-400'
                }
              >
                All Expenses
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/add-expense'
                className={
                  pathname === ROUTES.ADD_EXPENSES ? 'text-yellow-400' : 'hover:text-yellow-400'
                }
              >
                Add Expense
              </Link>
            </li>
          </ul>

          <div className='ml-auto'>
            <div onClick={onLogout} className='cursor-pointer text-red-500 hover:text-red-400'>
              Logout
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
