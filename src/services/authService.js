import api from './apiRequest';

export const login = function (email, password) {
    return api.post('/auth/login', { email, password }, true);
};

export const register = function (username, email, password) {
    return api.post('/auth/register', { username, email, password }, false);
};

export const logout = function () {
    return api.delete('/auth/logout', false);
}