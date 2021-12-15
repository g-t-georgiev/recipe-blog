import Form from '../../shared/form/Form';

const elements = {
    inputs: [
        {
            id: 1,
            type: 'text',
            name: 'username',
            placeholder: 'Enter username..',
            error: 'Username should be between 4 and 15 characters long and could consist of latin letters, digits, hyphens, underscores and dots.',
            pattern: '',
            required: true
        },
        {
            id: 2,
            type: 'email',
            name: 'email',
            placeholder: 'Enter your email..',
            error: 'Please provide valid email format.',
            pattern: '',
            required: true
        },
        {
            id: 3,
            type: 'password',
            name: 'password',
            placeholder: 'Enter password..',
            error: 'Password should be between 6 and 15 characters long.',
            pattern: '',
            required: true
        },
        {
            id: 4,
            type: 'password',
            name: 'confirmPassword',
            placeholder: 'Repeat password..',
            error: 'Passwords do not match.',
            pattern: '',
            required: true
        }
    ],
    button: {
        text: 'Sign up',
        type: 'submit'
    },
    footer: {
        span: {
            text: 'Already have an account?'
        },
        link: {
            text: 'Sign in.',
            to: '/auth/login'
        }
    }
};

function Register() {
    return (
        <section>
            <Form name="registerForm" title="Create an account" elements={elements} />
        </section>
    );
}

export default Register;