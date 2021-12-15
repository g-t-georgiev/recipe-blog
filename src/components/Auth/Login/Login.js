import Form from '../../shared/form/Form';

const elements = {
    inputs: [
        {
            id: 1,
            type: 'email',
            name: 'email',
            placeholder: 'Enter your email..',
            error: 'Please provide valid email format.',
            pattern: '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])',
            required: true
        },
        {
            id: 2,
            type: 'password',
            name: 'password',
            placeholder: 'Enter password..',
            error: 'Password length should be between 6 and 15 characters and should contain at least one letter and/or digit and optionally the following special symbols: @$!%*#?&',
            pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{6,15}$',
            required: true
        }
    ],
    button: {
        text: 'Sign in',
        type: 'submit'
    },
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