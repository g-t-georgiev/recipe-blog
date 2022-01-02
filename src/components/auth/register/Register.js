import useAuthActions from '../../../hooks/useAuthActions';

import Form from '../../shared/form/Form';
import FormInput from '../../shared/form-input/FormInput';
import FormButton from '../../shared/form-button/FormButton';
import FormFooter from '../../shared/form-footer/FormFooter';

import { getValidationSchema } from '../constants';

function Register() {
    const authActions = useAuthActions();

    return (
        <Form 
            name="registerForm" 
            title="Create new account" 
            schema={getValidationSchema('registerForm')} 
            action={authActions.register} 
            redirect={true}
        >

            <FormInput 
                type="text" 
                name="username" 
                id="username" 
                placeholder="Username" 
            />

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

            <FormButton text="Sign up" />

            <FormFooter 
                span={{ text: 'Already have an account?' }} 
                link={{ text: 'Sign in.', to: '/users/login' }} 
            />
        </Form>
    );
}

export default Register;