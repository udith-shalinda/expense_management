'use client';
import Dashboard from '../../components/Dashboard';
import { withAuth } from '@/hoc/withAuth/withAuth';

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default withAuth(DashboardPage);
