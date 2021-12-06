import { Link } from "react-router-dom";

import cssClasses from '../Auth.module.css';

function Register() {

    const submitHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('Submitted');
    }

    return (
        <section>
            <h2 className={cssClasses['form-title']}>Register</h2>
            <form className={cssClasses['auth-form']} onSubmit={submitHandler}>
                <div className={cssClasses['form-row']}>
                    <input className={cssClasses['form-input']} type="username" name="username" id="username" placeholder="Username" />
                </div>
                <div className={cssClasses['form-row']}>
                    <input className={cssClasses['form-input']} type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div className={cssClasses['form-row']}>
                    <input className={cssClasses['form-input']} type="password" name="password" id="password" placeholder="Password" />
                </div>
                <div className={cssClasses['form-row']}>
                    <input className={cssClasses['form-input']} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                </div>
                <div className={cssClasses['form-row']}>
                    <button className={cssClasses['form-button']} type="submit">Sign up</button>
                </div>
                <div className={cssClasses['form-row']}>
                    <span className={cssClasses['form-footer']}>
                        Already a member?
                        <Link to="/auth/login">Sign in.</Link>
                    </span>
                </div>
            </form>
        </section>
    );
}

export default Register;