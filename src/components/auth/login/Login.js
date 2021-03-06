import useAuthActions from '../../../hooks/useAuthActions';

import Form from '../../shared/form/Form';
import FormInput from '../../shared/form-input/FormInput';
import FormButton from '../../shared/form-button/FormButton';
import FormFooter from '../../shared/form-footer/FormFooter';

import { getValidationSchema } from '../constants';

function Login() {
    const authActions = useAuthActions();

    return (
        <Form 
            name="loginForm" 
            title="Sign in to your account" 
            schema={getValidationSchema('loginForm')} 
            action={authActions.login} 
            redirect={true}
        >

            <FormInput 
                type="text" 
                name="email" 
                id="email" 
                placeholder="Email" 
            />

            <FormInput 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Password" 
            />

            <FormButton text="Sign in" />

            <FormFooter 
                span={{ text: 'Not a member yet?' }} 
                link={{ text: 'Sign up.', to: '/users/register' }} 
            />
        </Form>
    );
}

export default Login;