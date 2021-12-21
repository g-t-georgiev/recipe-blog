import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuthContext = function () {
    return useContext(AuthContext);
}

export const AuthContextProvider = function ({ children }) {
    return <AuthContext.Provider value={}>
        {children}
    </AuthContext.Provider>
};

export default AuthContext;