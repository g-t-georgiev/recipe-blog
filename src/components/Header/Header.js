import { NavLink } from "react-router-dom";

import './Header.css';

const setActiveLinkStyles = function ({ isActive }) {
    return isActive 
        ? 'site-navigation-link link-active'
        : 'site-navigation-link';
}

function Header(props) {
    return (
        <header className="site-header">
            <h2 className="site-header-title">Recipe Blog</h2>
            <nav className="site-navigation">
                <NavLink className={setActiveLinkStyles} to="/">Home</NavLink>
                <NavLink className={setActiveLinkStyles} to="/auth/login">Login</NavLink>
                <NavLink className={setActiveLinkStyles} to="/auth/register">Register</NavLink>
            </nav>
        </header>
    );
}

export default Header;