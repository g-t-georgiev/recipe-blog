import RegisterForm from './RegisterForm';

import useFetch from '../../../hooks/useFetch';

function Register() {
    const request = useFetch('post', '/auth/register');

    return (
        <section>
            <RegisterForm action={request} />
        </section>
    );
}

export default Register;