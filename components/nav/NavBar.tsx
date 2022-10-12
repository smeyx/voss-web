import Link from 'next/link';
import navStyles from './nav.module.css';

const NavBar: React.FC = (): JSX.Element => {
  return ( 
    <nav className="sticky top-0 flex flex-row justify-between mx-auto ml-20 md:py-6 md:mb-6 md:items-center">
        <Link href="/">
          <a className="font-medium uppercase transition-colors text-grey-900 hover:text-purple-600">
            VOSSS
          </a>
        </Link>
        <div className="mr-32 font-medium text-gray-800">
          <Link href="/login" passHref>
            <a className={ `${ navStyles.navlink } font-medium uppercase` }>
                Login
            </a>
          </Link>
        </div>
    </nav> 
  );
};

export default NavBar;
