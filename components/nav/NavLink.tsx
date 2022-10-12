import navStyles from './nav.module.css';

const NavLink = ({ children } : { children: React.ReactNode }): JSX.Element => {
  return (
    <span className={`${ navStyles.navlink } font-medium uppercase` }>{ children }</span>
  )
}

export default NavLink;
