import type { ReactElement } from 'react';
import type { User } from '@models/user/';
import { SubNav } from '@components/Dashboard/Subnav/';
import type { SubLink } from './Subnav/Subnav';

interface DashBoardProps {
  children?: ReactElement,
  user: User,
  activeTab: string;
}

const Dashboard: React.FC<DashBoardProps> = ({ children, user, activeTab = 'overview' }): ReactElement => {
  const links: SubLink[] = [
    { path: '/dashboard/overview', name: 'Overview' },
    { path: '/dashboard/invoices', name: 'Invoices' },
    { path: '/dashboard/customers', name: 'Customers' },
  ] 

  return (
    <div className="flex flex-col">
      <SubNav links={ links } activeTab={activeTab} />
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
}

export default Dashboard;
