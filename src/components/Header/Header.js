import { useState, useCallback } from 'react';
import { Link } from "react-router-dom";

import './Header.css';

import { useAuthContext } from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';

import ToggleNavButton from "./toggle-nav-button/ToggleNavButton";
import SignOutButton from './signout-button/SignOutButton';

import formatName from '../../helpers/formatName';

const initialNavState = { opened: false };

function Header() {
    const [navState, setNavState] = useState(initialNavState);
    const categories = useFetch('/data/categories');
    const { user } = useAuthContext();

    const openNav = useCallback(function (e) {
        if (navState.opened) {
            return;
        }

        setNavState({ opened: true });
    }, [navState, setNavState]);

    const closeNav = useCallback(function (e) {
        const windowWidth = window.innerWidth;
        const currentTargetWidth = e.currentTarget.clientWidth;

        if (windowWidth !== currentTargetWidth) {
            return;
        }

        if (!navState.opened) {
            return;
        }

        setNavState({ opened: false });
    }, [navState, setNavState]);

    return (
        <header className="site-header">
            <h2 className="site-header-title">
                Food Blog
            </h2>

            <nav className="site-navigation">
                <ToggleNavButton openNavHandler={openNav} />
                <section className={`site-navigation-links ${navState.opened ? 'opened' : 'closed'}`} onClick={closeNav}>
                    <Link className="site-navigation-link" to="/">Home</Link>

                    <span className="dropdown">
                        <span className="dropdown-title">Recipes</span>
                        <span className="dropdown-links">
                            <Link className="site-navigation-link" to="/recipes">Browse All</Link>
                            <span className="dropdown-section-title">Categories</span>
                            {
                                categories.status === 'fetched'
                                ? Array.isArray(categories.data) && categories.data.length > 0
                                ? categories.data.map(
                                    category => (
                                        <Link 
                                            key={category._id} 
                                            className="site-navigation-link" 
                                            to={`/recipes?category=${category.title.toLowerCase()}`}
                                        >
                                            {formatName(category.title)}
                                        </Link>
                                    )
                                )
                                : <span className="site-navigation-link default-text">No categories</span>
                                : <span className="site-navigation-link default-text">
                                    {
                                        ['idle', 'fetching'].includes(categories.status)
                                        ? 'Loading...'
                                        : categories.status === 'error'
                                        ? 'Error loading categories'
                                        : 'N/A'
                                    }
                                </span>
                            }
                        </span>
                    </span>

                    <span className="dropdown">
                        <span className="dropdown-title">Profile</span>
                        <span className="dropdown-links">
                            {
                                user.isLoggedIn
                                    ? (
                                        <>
                                            <span className="dropdown-section-title">Hello, {user.username}!</span>
                                            <Link className="site-navigation-link" to={`/users/${user.id}/favorites`}>Favorites</Link>
                                            <Link className="site-navigation-link" to={`/users/${user.id}/recipes`}>My Recipes</Link>
                                            <Link className="site-navigation-link" to="/recipes/create">Add Recipe</Link>
                                            <SignOutButton>Logout</SignOutButton>
                                        </>
                                    )
                                    : (
                                        <>
                                            <span className="dropdown-section-title">Hello, guest!</span>
                                            <Link className="site-navigation-link" to="/users/login">Login</Link>
                                            <Link className="site-navigation-link" to="/users/register">Register</Link>
                                        </>
                                    )
                            }
                        </span>
                    </span>
                </section>
            </nav >
        </header >
    );
}

export default Header;