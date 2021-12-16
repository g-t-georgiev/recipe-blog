import Form from '../../shared/form/Form';

const elements = {
    inputs: [
        {
            id: 1,
            type: 'text',
            name: 'username',
            placeholder: 'Enter username..',
            error: 'Username should be between 4 and 15 characters long and could contain letters and digits, as well as, a hyphen, an underscore or a dot. Hyphens, underscores and dots cannot sit next to each other or be at the beginning or in the end of the sequence.',
            pattern: '^(?=[a-zA-Z0-9._\\-]{4,15}$)(?!.*[_.\\-]{2})[^_.\\-].*[^_.\\-]$',
            required: true
        },
        {
            id: 2,
            type: 'email',
            name: 'email',
            placeholder: 'Enter your email..',
            error: 'Please provide valid email format.',
            pattern: '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])',
            required: true
        },
        {
            id: 3,
            type: 'password',
            name: 'password',
            placeholder: 'Enter password..',
            error: 'Password length should be between 6 and 15 characters and should contain at least one letter and/or digit and optionally the following special symbols: @$!%*#?&',
            pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{6,15}$',
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