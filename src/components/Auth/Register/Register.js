import { Link } from 'react-router-dom';

import Form from '../../shared/form/Form';
import FormFooter from '../../shared/form/form-footer/FormFooter';
import FormInput from '../../shared/form/form-input/FormInput';
import FormButton from '../../shared/form/form-button/FormButton';

function Register() {


    return (
        <section>
            <Form name="registerForm" title="Create an account">
                <FormInput name="username" placeholder="Enter username.." />
                <FormInput type="email" name="email" placeholder="Enter email address.." />
                <FormInput type="password" name="password" placeholder="Enter password.." />
                <FormInput type="password" name="confirmPassword" placeholder="Repeat password.." />
                <FormButton>Sign up</FormButton>
                <FormFooter>
                    Already a member? &nbsp;
                    <Link to="/auth/login">Sign in.</Link>
                </FormFooter>
            </Form>
        </section>
    );
}

export default Register;