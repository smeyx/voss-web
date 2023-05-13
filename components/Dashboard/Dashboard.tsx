import type { ReactElement } from 'react';
import type { User } from '@models/user/';
import { SubNav } from '@components/Dashboard/Subnav/';

interface DashBoardProps {
  children?: ReactElement,
  user: User,
  activeTab: string;
}

const Dashboard: React.FC<DashBoardProps> = ({ children, user, activeTab = 'overview' }): ReactElement => {

  return (
    <div className="flex flex-col">
      <SubNav activeTab={activeTab} />
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
}

export default Dashboard;
