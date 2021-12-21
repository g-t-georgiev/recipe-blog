import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function SignOutButton({ signOutAction }) {
    const redirectTo = useNavigate();

    const signOutHandler = useCallback(function () {
        // Make API service call to logout
        signOutAction();
        redirectTo('/');
    }, [signOutAction]);

    return <button onClick={signOutHandler}>Logout</button>
}

export default SignOutButton;