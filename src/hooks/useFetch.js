import { authHeaderName, apiUrl } from '../constants';
import getAccessToken from '../services/getAccessToken';

export default function useFetch(method = 'get', path = '', parseJSON = false, isAuthenticated = false) {
    let controller = new AbortController();

    const request = async function (payload = null) {
        const options = {
            method: method,
            headers: {},
            signal: controller.signal
        };
        
        if (['post', 'put'].includes(method)) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(payload);
        }

        if (isAuthenticated) {
            options.headers[authHeaderName] = 'Bearer ' + getAccessToken() ?? '';
        }

        const response = await fetch(apiUrl + path, method !== 'get' ? options : null);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        let result = null;

        if (parseJSON) {
            result = await response.json();
        }

        return result;
    };

    const abort = function () {
        controller.abort();
        controller = new AbortController();
    };

    return { request, abort };
}