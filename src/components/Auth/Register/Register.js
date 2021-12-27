import RegisterForm from './RegisterForm';

import useFetch from '../../../hooks/useFetch';

function Register() {
    const action = useFetch('post', '/auth/register');

    return (
        <section>
            <RegisterForm action={action} />
        </section>
    );
}

export default Register;