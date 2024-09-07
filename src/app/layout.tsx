'use client';
import { Provider } from 'react-redux';
import './globals.css';
import Link from 'next/link';
import { store } from '@/store/store';

const metadata = {
  title: 'Expense Tracker',
  description: 'Track your personal expenses',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
