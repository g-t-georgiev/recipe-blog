import { Link } from "react-router-dom";

import '../Auth.css';

function Register() {

    const submitHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('Submitted');
    }

    return (
        <section>
            <h2 className="form-title">Register</h2>
            <form className="auth-form" onSubmit={submitHandler}>
                <div className="form-row">
                    <input className="form-input" type="username" name="username" id="username" placeholder="Username" />
                </div>
                <div className="form-row">
                    <input className="form-input" type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div className="form-row">
                    <input className="form-input" type="password" name="password" id="password" placeholder="Password" />
                </div>
                <div className="form-row">
                    <input className="form-input" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                </div>
                <div className="form-row">
                    <button className="form-button" type="submit">Sign up</button>
                </div>
                <div className="form-row">
                    <span className="form-rooter">
                        Already a member?
                        <Link to="/auth/login">Sign in.</Link>
                    </span>
                </div>
            </form>
        </section>
    );
}

export default Register;