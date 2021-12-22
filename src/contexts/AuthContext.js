import { createContext, useContext, useCallback, useMemo } from 'react';
import { useBrowserStorage } from '../hooks/useBrowserStorage';

import { userCachKey } from '../constants';

const initialState = {
    id: '',
    username: '',
    email: '',
    isLoggedIn: false
};

const AuthContext = createContext(null);

export const useAuthContext = function () {
    return useContext(AuthContext);
}

export const AuthContextProvider = function ({ children }) {
    const [user, setUser, resetUser] = useBrowserStorage(userCachKey, initialState);

    const signIn = useCallback(function (authData) {
        setUser(authData);
    }, [setUser]);

    const signOut = useCallback(function () {
        resetUser();
    }, [resetUser]);

    const context = useMemo(function () {
        return {
            user,
            signIn,
            signOut
        };
    }, [user, signIn, signOut]);

    return <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
};

export default AuthContext;