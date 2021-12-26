import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";

import './Header.css';

import { useAuthContext } from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';

import ToggleNavButton from "./ToggleNavButton/ToggleNavButton";
import SignOutButton from './SignOutButton/SignOutButton';

function Header() {
    const [ navState, setNavState ] = useState({ opened: false });
    const [ categories, setCategories ] = useState([]);
    const { user, signOut } = useAuthContext();
    const { request, abort } = useFetch('get', '/data/categories', true);

    useEffect(function () {
        request()
            .then(categories => setCategories(state => ([ ...state, ...categories])))
            .catch(error => console.log(error));

        return function () {
            abort();
        };
    }, [categories, request, abort]);

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
                <section className={`site-navigation-links ${navState.opened ? 'opened' : 'closed'}`} onMouseUp={closeNav}>
                    <Link className="site-navigation-link" to="/">Home</Link>
                    
                    <span className="dropdown">
                        <span className="dropdown-title">Recipes</span>
                        <span className="dropdown-links">
                            <Link className="site-navigation-link" to="/recipes">Browse All</Link>
                            <span className="dropdown-section-title">Categories</span>
                            {
                                categories.length > 0
                                ? categories.map(category => (
                                    <Link className="site-navigation-link" to={`/recipes?category="${category.title.toLowerCase()}"`}>{category.title}</Link>
                                ))
                                : <span className="site-navigation-link default-text">No categories</span>
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
                                            <SignOutButton signOut={signOut}>Logout</SignOutButton>
                                        </>
                                    )
                                    : (
                                        <>
                                            <span className="dropdown-section-title">Hello, Guest!</span>
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