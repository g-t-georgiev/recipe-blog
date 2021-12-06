import { Link } from "react-router-dom";

import cssClasses from '../Auth.module.css';

function Login() {

    const submitHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('Submitted');
    }
    
    return (
        <section>
            <h2 className={cssClasses['form-title']}>Login</h2>
            <form className={cssClasses['auth-form']} onSubmit={submitHandler}>
                <div className={cssClasses['form-row']}>
                    <input className={cssClasses['form-input']} type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div className={cssClasses['form-row']}>
                    <input className={cssClasses['form-input']} type="password" name="password" id="password" placeholder="Password" />
                </div>
                <div className={cssClasses['form-row']}>
                    <button className={cssClasses['form-button']} type="submit">Sign in</button>
                </div>
                <div className={cssClasses['form-row']}>
                    <span className={cssClasses['form-footer']}>
                        Dont't have an accout?
                        <Link to="/auth/register">Sign up.</Link>
                    </span>
                </div>
            </form>
        </section>
    );
}

export default Login;