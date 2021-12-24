import { authHeaderName, apiUrl } from '../constants';
import getAccessToken from './getAccessToken';

const request = async function (method, path, payload, parseJSON, isAuthenticated) {
    try {
        const requestController = new AbortController();

        method = method ?? 'get';

        if (!path) {
            throw new Error('Invalid argument path.');
        }
    
        let options = {};

        options.method = method;
        options.sign = requestController.signal;
        options.headers = {};

        if (['post', 'put', 'patch'].includes(method)) {
            if (!payload) {
                throw new Error('Invalid argument payload.');
            }

            options.headers['content-type'] = 'application/json';
            options.body = JSON.stringify(payload);
        }

        if (isAuthenticated) {
            options.headers[authHeaderName] = `Bearer ${getAccessToken()}`;
        }
    
        let result = await fetch(apiUrl + path, options);

        if (!result.ok) {
            const error = await result.json();
            throw new Error(error.message);
        }
    
        if (parseJSON) {
            result = await result.json();
        }
    
        return [result, requestController];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const api = {
    get(path, parseJSON = true, isAuthenticated = false) {
        return request('get', path, null, parseJSON, isAuthenticated);
    },
    post(path, payload, parseJSON = true, isAuthenticated = false) {
        return request('post', path, payload, parseJSON, isAuthenticated);
    },
    put(path, payload, parseJSON = true, isAuthenticated = true) {
        return request('put', path, payload, parseJSON, isAuthenticated);
    },
    delete(path, parseJSON = false, isAuthenticated = true) {
        return request('delete', path, null, parseJSON, isAuthenticated);
    }
};

export default api;