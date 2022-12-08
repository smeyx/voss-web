import { FileText, UserList, Cards } from 'phosphor-react';
import Link from 'next/link';
import type { ReactElement } from 'react';
interface SubNavProps {
  activeTab: string;
}

//TODO: extract tabs into components
const SubNav: React.FC<SubNavProps> = ({ activeTab }): ReactElement => {
  const aStyles = 'flex w-full sm:border-0 border-t-2 border-transparent items-center pt-4 sm:p-2 sm:rounded-md hover:text-primary-500 dark:hover:text-secondary-500 transition-colors';
  const activeStyles = 'border-t-2 font-bold sm:border-t-0 dark:sm:bg-neutral-800 sm:bg-neutral-200 text-primary-500 dark:text-secondary-500'
  return (
    <aside className="flex justify-between pb-3 sm:items-stretch sm:justify-start sm:flex-col">
        <Link href="/dashboard/overview" className="flex-initial shrink-0">
            <button className={ `${ aStyles } ${ activeTab === 'overview' && activeStyles }` }>
                <Cards size="20" className="mr-4" weight={ activeTab === 'overview' ? 'fill' : 'regular'}/>
                Overview
            </button>
        </Link>
        <Link href="/dashboard/invoices" className="flex-initial shrink-0">
            <button className={ `${ aStyles } ${ activeTab === 'invoices' && activeStyles }` }>
              <FileText size="20" className="mr-4" weight={ activeTab === 'invoices' ? 'fill' : 'regular'}/>
                Invoices
            </button>
        </Link>
        <Link href="/dashboard/customers" className="flex-initial shrink-0">
            <button className={ `${ aStyles } ${ activeTab === 'customers' && activeStyles }` }>
                <UserList size="20" className="mr-4" weight={ activeTab === 'customers' ? 'fill' : 'regular'}/>
                Customers
            </button>
        </Link>
    </aside>
  );
};

export default SubNav;
