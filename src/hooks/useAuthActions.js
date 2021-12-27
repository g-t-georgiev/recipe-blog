import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext'
import * as authService from '../services/authService';

function useAuthActions() {
    const { signIn, signOut } = useAuthContext();
    const redirectTo = useNavigate();

    const login = useCallback(async function ({ email, password }) {
        const userData = await authService.login(email, password);
        signIn(userData);
        return () => redirectTo('/', { replace: true });
    }, [signIn, redirectTo]);

    const register = useCallback(async function ({ username, email, password }) {
        await authService.register(username, email, password);
        return () => redirectTo('/users/login');
    }, [redirectTo]);

    const logout = useCallback(async function () {
        await authService.logout();
        signOut();
        return () => redirectTo('/');
    }, [signOut, redirectTo]);

    return { login, register, logout };
}

export default useAuthActions;