import Form from '../../shared/form/Form';
import FormInput from '../../shared/form-input/FormInput';
import FormButton from '../../shared/form-button/FormButton';
import FormFooter from '../../shared/form-footer/FormFooter';

function Login() {
    return (
        <section>
            <Form name="loginForm" title="Sign in to your account">
                <FormInput type="email" name="email" id="email" placeholder="Email" />
                <FormInput type="password" name="password" id="password" placeholder="Password" />
                <FormButton text="Sign in" />
                <FormFooter span={{ text: 'Not a member yet?' }} link={{ text: 'Sign up.', to: '/auth/register' }} />
            </Form>
        </section>
    );
}

export default Login;