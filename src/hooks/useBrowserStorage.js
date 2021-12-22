import { useState } from 'react';

export const useBrowserStorage = function (key = '', initialValue = {}) {
    const [ state, setState ] = useState(function () {
        try {
            let item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setItem = function (value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            setState(value);
        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = function () {
        try {
            localStorage.removeItem(key);
            setState(initialValue);
        } catch (error) {
            console.log(error);
        }
    };

    return [state, setItem, removeItem];
}