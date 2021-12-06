import { NavLink } from "react-router-dom";

import cssClasses from './Header.module.css';

const setActiveLinkStyles = function ({ isActive }) {
    const linkStyles = ['site-navigation-link', 'active'];
    return isActive 
        ? `${cssClasses[linkStyles[0]]} ${cssClasses[linkStyles[1]]}`
        : `${cssClasses[linkStyles[0]]}`;
}

function Header(props) {
    return (
        <header className={cssClasses['site-header']}>
            <h2 className={cssClasses['site-header-title']}>Recipe Blog</h2>
            <nav className={cssClasses['site-navigation']}>
                <NavLink className={setActiveLinkStyles} to="/">Home</NavLink>
                <NavLink className={setActiveLinkStyles} to="/auth/login">Login</NavLink>
                <NavLink className={setActiveLinkStyles} to="/auth/register">Register</NavLink>
            </nav>
        </header>
    );
}

export default Header;