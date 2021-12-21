import Form from '../../shared/form/Form';
import FormInput from '../../shared/form-input/FormInput';
import FormButton from '../../shared/form-button/FormButton';
import FormFooter from '../../shared/form-footer/FormFooter';

function Register() {
    return (
        <section>
            <Form name="registerForm" title="Create new account">
                <FormInput type="text" name="username" id="username" placeholder="Username" />
                <FormInput type="email" name="email" id="email" placeholder="Email" />
                <FormInput type="password" name="password" id="password" placeholder="Password" />
                <FormButton text="Sign up" />
                <FormFooter span={{ text: 'Already have an account?' }} link={{ text: 'Sign in.', to: '/users/login' }} />
            </Form>
        </section>
    );
}

export default Register;