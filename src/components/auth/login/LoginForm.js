import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

import { getValidationSchema } from '../constants';

import Form from '../../shared/form/Form';
import FormInput from '../../shared/form-input/FormInput';
import FormButton from '../../shared/form-button/FormButton';
import FormFooter from '../../shared/form-footer/FormFooter';

function LoginForm({ action }) {
    const { signIn } = useAuthContext();

    const redirectTo = useNavigate();

    const login = useCallback(async function (formData, updateFormState) {
        try {
            updateFormState(true);
            const userData = await action.request({ email: formData.email, password: formData.password });
            // if operation has not finished abort it prevent memory leak.
            action.abort();
            signIn(userData);
            updateFormState(false, true);
            redirectTo('/');
        } catch (error) {
            updateFormState(false, false, error.message, error?.multiple);
        }
    }, [redirectTo, signIn, action]);

    return (
        <Form name="loginForm" title="Sign in to your account" schema={getValidationSchema('loginForm')} action={login}>
            <FormInput type="text" name="email" id="email" placeholder="Email" />
            <FormInput type="password" name="password" id="password" placeholder="Password" />
            <FormButton text="Sign in" />
            <FormFooter span={{ text: 'Not a member yet?' }} link={{ text: 'Sign up.', to: '/users/register' }} />
        </Form>
    )
}

export default LoginForm;