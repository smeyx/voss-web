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
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-col w-full mx-auto sm:w-1/5">
        <div className="flex mb-5 break-all border-0 sm:border-b">
          <span>hey { user.email }</span>
        </div>
        <SubNav activeTab={ activeTab }/>
      </div>
      <div className="sm:px-10 sm:w-4/5">
        { children }
      </div>
    </div>
  );
}

export default Dashboard;
