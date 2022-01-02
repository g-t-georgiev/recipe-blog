import { useCallback } from 'react';

import useAuthActions from '../../../hooks/useAuthActions';

import './SignOutButton.css';

function SignOutButton() {
    const authActions = useAuthActions();

    const clickHandler = useCallback(function () {
        authActions.logout()
            .then(redirectHandler => redirectHandler())
            .catch(error => console.log('Error signing out: ' + error.message));
    }, [authActions]);

    return <button onClick={clickHandler} className="site-navigation-link logout">Logout</button>
}

export default SignOutButton;