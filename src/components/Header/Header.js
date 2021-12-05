import { NavLink } from "react-router-dom";

function Header(props) {
    return (
        <header>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/auth/login">Login</NavLink>
                <NavLink to="/auth/register">Register</NavLink>
            </nav>
        </header>
    );
}

export default Header;