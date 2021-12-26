import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignOutButton.css';

import useFetch from '../../../hooks/useFetch';

function SignOutButton({ signOut }) {
    const request = useFetch('delete', '/auth/logout', false, true);
    const redirectTo = useNavigate();

    const signOutHandler = useCallback(async function () {
        try {
            await request();
            signOut();
            redirectTo('/');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, [request, signOut, redirectTo]);

    return <button className="site-navigation-link logout" onClick={signOutHandler}>Logout</button>
}

export default SignOutButton;