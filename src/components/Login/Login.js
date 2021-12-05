import { Link } from "react-router-dom";

function Login() {
    return (
        <section>
            <h2>Login</h2>
            <form>
                <div>
                    <input type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="Password" />
                </div>
                <div>
                    <button type="submit">Sign in</button>
                </div>
                <div>
                    <span>
                        Dont't have an accout?
                        <Link to="/auth/register">Sign up.</Link>
                    </span>
                </div>
            </form>
        </section>
    );
}

export default Login;