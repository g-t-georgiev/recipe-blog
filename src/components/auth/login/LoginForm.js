import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';

import Form from '../../shared/form/Form';
import FormInput from '../../shared/form-input/FormInput';
import FormButton from '../../shared/form-button/FormButton';
import FormFooter from '../../shared/form-footer/FormFooter';

function LoginForm() {
    const { signIn } = useAuthContext();
    const [ timerId, setTimer ] = useState(null);
    const redirectTo = useNavigate();

    const redirectDelayHandler = useCallback(function () {
        clearTimeout(timerId);
        redirectTo('/');
    }, [redirectTo, timerId]);

    const loginHandler = useCallback(async function (formFieldData, updateFormLoadingStatus, updateFormSubmitStatus, updateFormFieldStatus, updateServiceResponseStatus) {
        try {
            updateFormLoadingStatus(true);
    
            const userData = await authService.login(formFieldData.email, formFieldData.password);
            signIn(userData);
            
            updateServiceResponseStatus({ ok: true, message: ''});

            setTimer(
                setTimeout(redirectDelayHandler, 1500)
            );
        } catch (error) {
            updateServiceResponseStatus({ ok: false, message: error.message });
            Object.keys(formFieldData)
                .forEach(field => updateFormFieldStatus(field, formFieldData[field], false, `Incorrect or non-existing ${field}.`));
        } finally {
            updateFormLoadingStatus(false);
            updateFormSubmitStatus(true);
        }
    }, [redirectDelayHandler, signIn]);

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