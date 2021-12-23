import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../../services/authService';

import Form from '../../shared/form/Form';
import FormInput from '../../shared/form-input/FormInput';
import FormButton from '../../shared/form-button/FormButton';
import FormFooter from '../../shared/form-footer/FormFooter';

function RegisterForm() {
    const [ timerId, setTimer ] = useState(null);
    const redirectTo = useNavigate();

    const redirectDelayHandler = useCallback(function () {
        clearTimeout(timerId);
        redirectTo('/users/login');
    }, [redirectTo, timerId]);

    const registerHandler = useCallback(async function (formFieldData, updateFormLoadingStatus, updateFormSubmitStatus, updateFormFieldStatus, updateServiceResponseStatus) {
        try {
            updateFormLoadingStatus(true);
            await authService.register(formFieldData.username, formFieldData.email, formFieldData.password);
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
    }, [redirectDelayHandler]);

    return (
        <Form name="registerForm" title="Create new account" submitAction={registerHandler}>
            <FormInput type="text" name="username" id="username" placeholder="Username" />
            <FormInput type="email" name="email" id="email" placeholder="Email" />
            <FormInput type="password" name="password" id="password" placeholder="Password" />
            <FormButton text="Sign up" />
            <FormFooter span={{ text: 'Already have an account?' }} link={{ text: 'Sign in.', to: '/users/login' }} />
        </Form>
    )
}

export default RegisterForm;