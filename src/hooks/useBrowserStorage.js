import { useState, useCallback } from 'react';

export const useBrowserStorage = function (key, initialValue, storage = localStorage) {
    const [ state, setState ] = useState(function () {
        try {
            let item = storage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            setState(initialValue);
        }
    });

    const setItem = useCallback(function (value) {
        try {
            storage.setItem(key, JSON.stringify(value));
            setState(value);
        } catch (error) {
            console.log(error);
        }
    }, [storage, setState]);

    const removeItem = useCallback(function () {
        try {
            storage.removeItem(key);
            setState(initialValue);
        } catch (error) {
            console.log(error);
        }
    }, [storage, setState]);

    return [state, setItem, removeItem];
}