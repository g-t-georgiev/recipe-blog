import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";

import './Header.css';

import { useAuthContext } from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';

import ToggleNavButton from "./ToggleNavButton/ToggleNavButton";
import SignOutButton from './SignOutButton/SignOutButton';

const initialNavState = { opened: true };
const initialCategoryState = [];

function Header() {
    const [ navState, setNavState ] = useState(initialNavState);
    const [ categories, setCategories ] = useState(initialCategoryState);
    const { user, signOut } = useAuthContext();
    const request = useFetch('get', '/data/categories', true);

    useEffect(function () {
        // Create abort controller for aborting API requests on unmount
        // Or add boolean variable as an indicator that clean up function has run to prevent state update
        const abortController = new AbortController();
        let isActive = true;

        request(null, abortController.signal)
            .then(function (results) {
                // console.log(results);
                if (isActive) {
                    setCategories(function (categoriesState) {
                        let duplicate = categoriesState.some(function (current) {
                            return results.some(x => x._id.toString() === current._id.toString())
                        });

                        if (!duplicate) {
                            return [
                                ...categoriesState,
                                ...results
                            ]
                        }

                        return categoriesState;
                    });
                }
            })
            .catch(error => console.log(error));

        return function () {
            // Cancel requests
            // Update active indicator signaling component is being unmounted
            isActive = false;
            abortController.abort();
        };
    }, [request]);

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
                                    <Link key={category._id} className="site-navigation-link" to={`/recipes?category="${category.title.toLowerCase()}"`}>{category.title}</Link>
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