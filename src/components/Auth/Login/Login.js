import { Link } from "react-router-dom";

import Form from '../../shared/form/Form';
import FormFooter from '../../shared/form/form-footer/FormFooter';
import FormInput from '../../shared/form/form-input/FormInput';
import FormButton from '../../shared/form/form-button/FormButton';

import { emailRegexPattern } from '../../../constants';

function Login() {

    const submitHandler = function () {
        console.log('Submitted');
    }

    return (
        <section>
            <Form formTitle="Sign in to your account" formSubmitAction={submitHandler}>
                <FormInput type="email" name="email" placeholder="Enter your email.." validationConditions={{ isRequired: { value: true, message: 'Email is required' }, isEmail: { value: emailRegexPattern, message: 'Invalid email address' }}} />
                <FormInput type="password" name="password" placeholder="Enter password.." validationConditions={{ isRequired: { value: true, message: 'Password is required.' }, minLength: { value: 6, message: 'Password should be at least 6 characters long.' }}} />
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