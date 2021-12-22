import { createContext, useContext } from 'react';
import { useBrowserStorage } from '../hooks/useBrowserStorage';

import { userCachKey } from '../constants';

const initialState = {
    id: '',
    username: '',
    email: '',
    accessToken: null,
    isLoggedIn: false
};

const AuthContext = createContext(null);

export const useAuthContext = function () {
    return useContext(AuthContext);
}

export const AuthContextProvider = function ({ children }) {
    const [user, setUser, resetUser] = useBrowserStorage(userCachKey, initialState);

    const signIn = function (authData) {
        setUser({
                id: authData.id,
                username: authData.username,
                email: authData.email,
                accessToken: authData.accessToken,
                isLoggedIn: true
            });
    };

    const signOut = function () {
        resetUser();
    };

    const context = {
        user,
        signIn,
        signOut
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;