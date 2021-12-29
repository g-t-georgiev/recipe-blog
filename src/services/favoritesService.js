import getAccessToken from "./getAccessToken";
import { apiUrl, authHeaderName} from '../constants';

export const addToFavorites = async function (userId, recipeId) {
    const response = await fetch(apiUrl + `/users/${userId}/favorites`, {
        method: 'post',
        headers: {
            [authHeaderName]: `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipeId })
    });

    if (!response.ok && response.status === 404) {
        throw new Error('Connection error.');
    } else if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return null;
};

export const removeFromFavorites = async function (userId, recipeId) {
    const response = await fetch(apiUrl + `/users/${userId}/favorites?recipeId=${encodeURIComponent(recipeId)}`, {
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
};

export const checkIfAdded = async function (userId, recipeId) {
    const response = await fetch(apiUrl + `/users/${userId}/favorites?recipeId=${recipeId}`, {
        method: 'get',
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

    return response.json();
};