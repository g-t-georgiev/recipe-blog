import { useCallback } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';

import Form from '../../shared/form/Form';
import FormInput from '../../shared/form-input/FormInput';
import FormButton from '../../shared/form-button/FormButton';
import FormFooter from '../../shared/form-footer/FormFooter';

function LoginForm() {
    const loginHandler = useCallback(function (updateFormLoadingStatus, updateFormSubmitStatus, updateServiceResponseStatus) {
        // Implement login logic
    }, []);

    return (
        <Form name="loginForm" title="Sign in to your account" submitAction={loginHandler}>
            <FormInput type="email" name="email" id="email" placeholder="Email" />
            <FormInput type="password" name="password" id="password" placeholder="Password" />
            <FormButton text="Sign in" />
            <FormFooter span={{ text: 'Not a member yet?' }} link={{ text: 'Sign up.', to: '/users/register' }} />
        </Form>
    )
}

export default LoginForm;