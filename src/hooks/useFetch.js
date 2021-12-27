import { useState, useCallback } from 'react';

import { authHeaderName, apiUrl } from '../constants';
import getAccessToken from '../services/getAccessToken';

const initialControllerState = new AbortController();

export default function useFetch(method = 'get', path = '', parseJSON = false, isAuthenticated = false) {
    const [ controller ] = useState(function () {
        if (controller.aborted) {
            return new AbortController();
        } else {
            return initialControllerState;
        }
    });

    const request = useCallback(async function (payload = null) {
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
    }, [method, path, parseJSON, isAuthenticated]);

    const abort = useCallback(function () {
        controller.abort();
    }, [controller]);

    return { request, abort };
}