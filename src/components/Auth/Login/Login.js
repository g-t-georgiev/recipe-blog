import { Link } from "react-router-dom";

import '../Auth.css';

function Login() {

    const submitHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('Submitted');
    }
    
    return (
        <section>
            <h2 className="form-title">Login</h2>
            <form className="auth-form" onSubmit={submitHandler}>
                <div className="form-row">
                    <input className="form-input" type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div className="form-row">
                    <input className="form-input" type="password" name="password" id="password" placeholder="Password" />
                </div>
                <div className="form-row">
                    <button className="form-button" type="submit">Sign in</button>
                </div>
                <div className="form-row">
                    <span className="form-footer">
                        Dont't have an accout?
                        <Link to="/auth/register">Sign up.</Link>
                    </span>
                </div>
            </form>
        </section>
    );
}

export default Login;