import { useReducer, useCallback } from "react";

const reducer = function (state, { type, payload }) {
    switch (type) {
        case 'processing': {
            return {
                ...state,
                loading: true,
                submitted: true
            };
        }

        case 'success': {
            return {
                ...state,
                loading: false
            };
        }

        case 'failed': {
            return {
                ...state,
                loading: false,
                response: payload.message
            };
        }

        default: {
            return state;
        }
    }
};

const initialState = {
    loading: false,
    submitted: false,
    response: ''
};

export function useFormState() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateFormState = useCallback(function (loading = true, ok = true, message = '', multiple = false) {
        if (loading) {
            dispatch({ type: 'processing' });
            return;
        }

        if (ok) {
            dispatch({ type: 'success' });
            return;
        }

        dispatch({ type: 'failed', payload: { message: multiple ? message.split(' ') : message }});
    }, [dispatch]);

    return { formState: state, updateFormState };
}