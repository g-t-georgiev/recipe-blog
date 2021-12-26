import LoginForm from "./LoginForm";

import useFetch from '../../../hooks/useFetch';

function Login() {
    const request = useFetch('post', '/auth/login', true);

    return (
        <section>
            <LoginForm action={request} />
        </section>
    );
}

export default Login;