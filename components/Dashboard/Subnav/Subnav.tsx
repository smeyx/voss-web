import Link from 'next/link';

interface SubNavProps {
  links: SubLink[],
  activeTab: string;
}

export type SubLink = {
  path: string,
  name: string,
}

interface SubNavLinkProps {
  active: boolean;
  text: string,
  path: string,
}

const SubNavLink: React.FC<SubNavLinkProps> = ({ active, text, path }): JSX.Element => { 
  const aStyles = 'flex w-full py-2 px-4 gap-1 border-transparent items-center mb-1 hover:text-primary-500 dark:hover:text-secondary-500 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:rounded-md';
  const activeStyles = 'text-primary-500 dark:text-secondary-500'

  return (
    <Link
      href={ path }
      className={['flex-initial shrink-0', (active && 'border-b-2 border-primary-500 dark:border-secondary-600')].join(" ")}>
      <button className={[aStyles, active && activeStyles].join(" ")}>
        { text }
      </button>
    </Link>
  );
};

//TODO: extract tabs into components
const SubNav: React.FC<SubNavProps> = ({ activeTab, links }): JSX.Element => {
  return (
    <div className="flex flex-col w-full mx-auto mb-10 mt-2 border-b border-neutral-200 dark:border-neutral-600 sticky top-0 bg-neutral-50 dark:bg-neutral-900">
      <nav className="flex justify-between sm:items-stretch sm:justify-start gap-4 px-4">
        {links.map((link, i) => (<SubNavLink key={i} active={activeTab === link.name.toLowerCase()} text={link.name} path={link.path} />))}
      </nav>
    </div>
  );
};

export default SubNav;
