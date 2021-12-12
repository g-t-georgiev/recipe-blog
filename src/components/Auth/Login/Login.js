import { Link } from 'react-router-dom';

import Form from '../../shared/form/Form';
import FormFooter from '../../shared/form/form-footer/FormFooter';
import FormInput from '../../shared/form/form-input/FormInput';
import FormButton from '../../shared/form/form-button/FormButton';

function Login() {

    return (
        <section>
            <Form name="loginForm" title="Sign in to your account">
                <FormInput type="email" name="email" placeholder="Enter your email.." />
                <FormInput type="password" name="password" placeholder="Enter password.." />
                <FormButton>Sign in</FormButton>
                <FormFooter>
                    Not a member yet? &nbsp;
                    <Link to="/auth/register">Sign up.</Link>
                </FormFooter>
            </Form>
        </section>
    );
}

export default Login;