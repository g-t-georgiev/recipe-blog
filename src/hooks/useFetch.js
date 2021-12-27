import { useReducer, useRef, useEffect } from 'react';

import { authHeaderName, apiUrl } from '../constants';
import getAccessToken from '../services/getAccessToken';

const initialState = {
    status: 'idle',
    error: null,
    data: null
};

const reducer = function (state, { type, payload }) {
    switch (type) {
        case 'FETCHING': {
            return { ...state, status: 'fetching' };
        }
        case 'FETCHED': {
            return { ...state, status: 'fetched', data: payload };
        }
        case 'FETCH_ERROR': {
            return { ...state, status: 'error', data: payload };
        }
        default: {
            return state;
        }
    }
};

export default function useFetch(path = '', isAuthenticated = false) {
    const cache = useRef({});
    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(function () {
        let abortRequest = false;
        if (!path || typeof(path) !== 'string') return;

        dispatch({ type: 'FETCHING' });

        if (cache.current[path]) {
            const data = cache.current[path];
            dispatch({ type: 'FETCHED', payload: data });
            return;
        }

        const headers = isAuthenticated
            ? { headers: { 
                [authHeaderName]: `Bearer ${getAccessToken()}` 
            } }
            : null;

        fetch(apiUrl + path, headers)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching data.');
                }

                return response.json();
            })
            .then(data => {
                cache.current[path] = data;
                dispatch({ type: 'FETCHED', payload: data });
            })
            .catch(error => {
                if (abortRequest) return;
                dispatch({ type: 'FETCH_ERROR', payload: error.message });
            });

        return function () {
            abortRequest = true;
        };
    }, [path, isAuthenticated]);

    return state;
}