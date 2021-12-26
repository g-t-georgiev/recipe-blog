import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignOutButton.css';

import useFetch from '../../../hooks/useFetch';

function SignOutButton({ signOut }) {
    const action = useFetch('delete', '/auth/logout', false, true);
    const redirectTo = useNavigate();

    useEffect(function () {
        return function () {
            action.abort();
        };
    }, [action]);

    const signOutHandler = useCallback(async function () {
        try {
            await action.request();
            signOut();
            redirectTo('/');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, [action, signOut, redirectTo]);

    return <button className="site-navigation-link logout" onClick={signOutHandler}>Logout</button>
}

export default SignOutButton;