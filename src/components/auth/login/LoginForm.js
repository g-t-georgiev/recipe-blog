import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

import * as authService from '../../../services/authService';
import { validationSchema } from '../constants';

import Form from '../../shared/form/Form';
import FormInput from '../../shared/form-input/FormInput';
import FormButton from '../../shared/form-button/FormButton';
import FormFooter from '../../shared/form-footer/FormFooter';

function LoginForm() {
    const { signIn } = useAuthContext();
    const [ loginRequest, setLoginRequest] = useState(null);

    useEffect(function () {
        return function () {
            loginRequest?.abort();
        };
    }, [loginRequest]);

    const redirectTo = useNavigate();

    const login = useCallback(async function (formData, setFormStatus) {
        try {
            setFormStatus({ type: 'processing' });
    
            const [userData, controller] = await authService.login(formData.email, formData.password);

            signIn(userData);

            setLoginRequest(controller);

            setFormStatus({ type: 'success' });

            redirectTo('/');
        } catch (error) {
            if (error.hasOwnProperty('multiple') || error.multiple === false) {
                setFormStatus({ type: 'failed', payload: { message: error.message } });
            } else {
                setFormStatus({ type: 'failed', payload: { message: error.message.split(' ') } });
            }
        }
    }, [redirectTo, signIn]);

    return (
        <Form name="loginForm" title="Sign in to your account" schema={validationSchema} action={login}>
            <FormInput type="text" name="email" id="email" placeholder="Email" />
            <FormInput type="password" name="password" id="password" placeholder="Password" />
            <FormButton text="Sign in" />
            <FormFooter span={{ text: 'Not a member yet?' }} link={{ text: 'Sign up.', to: '/users/register' }} />
        </Form>
    )
}

export default LoginForm;