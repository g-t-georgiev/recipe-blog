import { apiUrl } from '../constants';

const request = async function (method, path, payload, parseJSON) {
    try {
        method = method ?? 'get';

        if (!path) {
            throw new Error('Invalid argument path.');
        }
    
        let options = {};
    
        if (['post', 'put', 'patch'].includes(method)) {
            if (!payload) {
                throw new Error('Invalid argument payload.');
            }
    
            options.method = method;
            options.headers = { 'content-type': 'application/json' };
            options.body = JSON.parse(payload);
        }
    
        let result = await fetch(apiUrl + path, options);
    
        if (parseJSON && result.ok) {
            result = await result.json();
        }
    
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const api = {
    get(path, parseJSON = true) {
        return request('get', path, null, parseJSON);
    },
    post(path, payload, parseJSON = true) {
        return request('post', path, payload, parseJSON);
    },
    put(path, payload, parseJSON = true) {
        return request('put', path, payload, parseJSON);
    },
    delete(path, parseJSON = false) {
        return request('delete', path, null, parseJSON);
    }
};

export default api;