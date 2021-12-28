import getAccessToken from "./getAccessToken";
import { authHeaderName, apiUrl } from '../constants';

export const create = async function (title, description, category, imageUrl) {
    const response = await fetch(apiUrl + '/data/recipes', {
        method: 'post',
        headers: {
            [authHeaderName]: `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, category, imageUrl })
    });

    if (!response.ok && response.status === 404) {
        throw new Error('Connection error.');
    } else if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return null;
};

export const remove = async function(recipeId) {
    const response = await fetch(apiUrl + `/data/recipes/${recipeId}`, {
        method: 'delete',
        headers: {
            [authHeaderName]: `Bearer ${getAccessToken()}`
        }
    })

    if (!response.ok && response.status === 404) {
        throw new Error('Connection error.');
    } else if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return null;
}

export const update = async function(recipeId, title, description, category, imageUrl) {
    const response = await fetch(apiUrl + `/data/recipes/${recipeId}`, {
        method: 'put',
        headers: {
            [authHeaderName]: `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, category, imageUrl })
    })

    if (!response.ok && response.status === 404) {
        throw new Error('Connection error.');
    } else if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}