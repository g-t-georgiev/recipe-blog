import Form from '../../shared/form/Form';

const elements = {
    inputs: [
        {
            name: 'email',
            required: true
        },
        {
            name: 'password',
            required: true
        }
    ],
    button: [
        {
            text: 'Sign in',
            type: 'submit'
        }
    ],
    footer: {
        span: {
            text: 'Not a member yer?'
        },
        link: {
            text: 'Sign up.',
            to: '/auth/register'
        }
    }
};

function Login() {
    return (
        <section>
            <Form name="loginForm" title="Sign in to your account" elements={elements} />
        </section>
    );
}

export default Login;