import type { ReactElement } from 'react';
import type { User } from '@models/user/';

interface DashBoardProps {
  user: User,
}

const Dashboard: React.FC<DashBoardProps> = ({ user }): ReactElement => {

  return (
    <div className="container flex mx-5">hey { user.email }</div>
  );
}

export default Dashboard;
