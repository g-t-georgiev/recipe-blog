import { useState } from 'react';
import { NavLink, Link } from "react-router-dom";

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
                    <NavLink className={setActiveLinkStyles} to="/">Home</NavLink>

                    <span className="dropdown">
                        <span className="dropdown-title">Recipes</span>
                        <span className="dropdown-links">
                            <Link className="site-navigation-link" to="/recipes">All</Link>
                            <span className="dropdown-section-title">Categories</span>
                            <Link className="site-navigation-link" to="/recipes?category=breakfast">Breakfast</Link>
                            <Link className="site-navigation-link" to="/recipes?category=lunch">Lunch</Link>
                            <Link className="site-navigation-link" to="/recipes?category=dinner">Dinner</Link>
                            <Link className="site-navigation-link" to="/recipes?category=pasta">Pasta</Link>
                            <Link className="site-navigation-link" to="/recipes?category=pizza">Pizza</Link>
                            <Link className="site-navigation-link" to="/recipes?category=dessert">Dessert</Link>
                        </span>
                    </span>

                    <span className="dropdown">
                        <span className="dropdown-title">Profile</span>
                        <span className="dropdown-links">
                            <NavLink className={setActiveLinkStyles} to="/users/login">Login</NavLink>
                            <NavLink className={setActiveLinkStyles} to="/users/register">Register</NavLink>
                        </span>
                    </span>
                </section>
            </nav>
        </header >
    );
}

export default Header;