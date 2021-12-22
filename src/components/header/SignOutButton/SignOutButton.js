import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignOutButton.css';

import * as authService from '../../../services/authService';

function SignOutButton({ signOutAction }) {
    const redirectTo = useNavigate();

    const signOutHandler = useCallback(async function () {
        try {
            await authService.logout();
        } catch (error) {
            console.log(error);
        } finally {
            signOutAction();
            redirectTo('/');
        }
    }, [signOutAction, redirectTo]);

    return <button className="site-navigation-link logout" onClick={signOutHandler}>Logout</button>
}

export default SignOutButton;