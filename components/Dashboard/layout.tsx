import Dashboard from '@components/Dashboard/'
import type { ReactElement } from 'react';

export default function DashboardLayout(page: ReactElement) {
  return (
    <Dashboard { ...page.props }/>
  );
}
