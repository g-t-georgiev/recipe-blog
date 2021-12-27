import LoginForm from "./LoginForm";

import useFetch from '../../../hooks/useFetch';

function Login() {
    const action = useFetch('post', '/auth/login', true);

    return (
        <section>
            <LoginForm action={action} />
        </section>
    );
}

export default Login;