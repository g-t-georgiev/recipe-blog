import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getValidationSchema } from '../constants';

import Form from '../../shared/form/Form';
import FormInput from '../../shared/form-input/FormInput';
import FormButton from '../../shared/form-button/FormButton';
import FormFooter from '../../shared/form-footer/FormFooter';

function RegisterForm({ action }) {
    useEffect(function () {
        return function () {
            action.abort();
        };
    }, [action]);

    const redirectTo = useNavigate();

    const register = useCallback(async function (formData, updateFormState) {
        try {
            updateFormState(true);
            await action.request({ username: formData.username, email: formData.email, password: formData.password });
            updateFormState(false, true);
            redirectTo('/users/login')
        } catch (error) {
            updateFormState(false, false, error.message, error?.multiple);
        }
    }, [redirectTo, action]);

    return (
        <Form name="registerForm" title="Create new account" schema={getValidationSchema('registerForm')} action={register}>
            <FormInput type="text" name="username" id="username" placeholder="Username" />
            <FormInput type="text" name="email" id="email" placeholder="Email" />
            <FormInput type="password" name="password" id="password" placeholder="Password" />
            <FormButton text="Sign up" />
            <FormFooter span={{ text: 'Already have an account?' }} link={{ text: 'Sign in.', to: '/users/login' }} />
        </Form>
    )
}

export default RegisterForm;