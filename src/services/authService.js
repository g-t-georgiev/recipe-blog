import getAccessToken from "./getAccessToken";
import { authHeaderName, apiUrl } from "../constants";

export const login = async function (email, password) {
    const response = await fetch(apiUrl + '/auth/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    if (!response.ok && response.status === 404) {
        throw new Error('Connection error.');
    } else if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}

export const register = async function (username, email, password) {
    const response = await fetch(apiUrl + '/auth/register', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    if (!response.ok && response.status === 404) {
        throw new Error('Connection error.');
    } else if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return null;
}

export const logout = async function () {
    const response = await fetch(apiUrl + '/auth/logout', {
        method: 'delete',
        headers: {
            [authHeaderName]: `Bearer ${getAccessToken()}`
        }
    });

    if (!response.ok && response.status === 404) {
        throw new Error('Connection error.');
    } else if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return null;
}

export const auth = async function (userId, recipeId) {
    const response = await fetch(apiUrl + `/users/${userId}/me`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            [authHeaderName]: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify({ recipeId: recipeId })
    });

    if (!response.ok && response.status === 404) {
        throw new Error('Connection error.');
    } else if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}