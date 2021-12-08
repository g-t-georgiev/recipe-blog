import { useState } from 'react';
import { NavLink } from "react-router-dom";

import './Header.css';

import ToggleNavButton from "./ToggleNavButton/ToggleNavButton";

const setActiveLinkStyles = function ({ isActive }) {
    return isActive
        ? 'site-navigation-link link-active'
        : 'site-navigation-link';
}

function Header() {
    const [navState, setNavState] = useState({ opened: false });

    const toggleNavState = function () {
        setNavState({ opened: !navState.opened });
    }

    return (
        <header className="site-header">
            <h2 className="site-header-title">
                Food Blog
            </h2>
            <nav className="site-navigation">
                <ToggleNavButton toggleNavHandler={toggleNavState} />
                <section className={`site-navigation-links ${navState.opened ? 'opened' : 'closed'}`} onClick={toggleNavState}>
                    <NavLink className={setActiveLinkStyles} to="/about">About</NavLink>
                    <NavLink className={setActiveLinkStyles} to="/">Recipes</NavLink>
                    <NavLink className={setActiveLinkStyles} to="/auth/login">Login</NavLink>
                    <NavLink className={setActiveLinkStyles} to="/auth/register">Register</NavLink>
                </section>
            </nav>
        </header>
    );
}

export default Header;