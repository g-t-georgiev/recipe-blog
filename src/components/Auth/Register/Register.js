import Form from '../../shared/form/Form';

const elements = {
    inputs: [
        {
            name: 'username',
            required: true
        },
        {
            name: 'email',
            required: true
        },
        {
            name: 'password',
            required: true
        }
    ],
    buttons: [
        {
            text: 'Sign up',
            type: 'submit'
        }
    ],
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