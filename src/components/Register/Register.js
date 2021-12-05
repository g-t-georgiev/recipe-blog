import { Link } from "react-router-dom";

function Register() {
    return (
        <section>
            <h2>Register</h2>
            <form>
                <div>
                    <input type="username" name="username" id="username" placeholder="Username" />
                </div>
                <div>
                    <input type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="Password" />
                </div>
                <div>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                </div>
                <div>
                    <button type="submit">Sign up</button>
                </div>
                <div>
                    <span>
                        Already a member?
                        <Link to="/auth/login">Sign in.</Link>
                    </span>
                </div>
            </form>
        </section>
    );
}

export default Register;