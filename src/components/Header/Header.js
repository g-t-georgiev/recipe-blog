import { useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext';

import './Header.css';

import ToggleNavButton from "./ToggleNavButton/ToggleNavButton";
import SignOutButton from './SignOutButton/SignOutButton';

function Header() {
    const [navState, setNavState] = useState({ opened: false });
    const { user, signOut } = useAuthContext();

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
                            {
                                user.isLoggedIn
                                    ? (
                                        <>
                                            <span className="dropdown-section-title">Hello, {user.username}!</span>
                                            <Link className="site-navigation-link" to={`/users/${user.id}/favorites`}>Favorites</Link>
                                            <Link className="site-navigation-link" to={`/users/${user.id}/recipes`}>My Recipes</Link>
                                            <Link className="site-navigation-link" to="/recipes/create">Add Recipe</Link>
                                            <SignOutButton signOutAction={signOut}>Logout</SignOutButton>
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