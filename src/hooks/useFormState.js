import { useReducer, useCallback } from "react";

const reducer = function (state, { type, payload }) {
    switch (type) {
        case 'error': {
            if (payload.valid) {
                if (payload.error.name in state.errors) {
                    let { [payload.error.name]: _, ...filteredErrors } = state.errors;
                    return {
                        ...state,
                        errors: {
                            ...filteredErrors
                        }
                    }
                } else {
                    return state;
                }
            } else {
                if (payload.error.name in state.errors) {
                    return state.errors[payload.error.name].includes(payload.error.message)
                        ? state
                        : {
                            ...state,
                            errors: {
                                ...state.errors,
                                [payload.error.name]: [
                                    ...state.errors[payload.error.name],
                                    payload.error.message
                                ]
                            }
                        }
                } else {
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            [payload.error.name]: [
                                payload.error.message
                            ]
                        }
                    };
                }
            }
        }

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
    response: '',
    errors: {}
};

export function useFormState() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const checkForErrors = useCallback(function (name = null, getDetails = false, multiple = false) {
        if (name) {
            return name in state.errors
            && getDetails 
            ? multiple
            ? state.errors[name]
            : state.errors[name][0] 
            : name in state.errors;
        }

        for (const error in state.errors) {
            return true;
        }

        return false;
    }, [state]);

    const updateFormErrorState = useCallback(function (payload, single = false) {
        if (single) {
            let { valid, ...error } = payload;
            dispatch({ type: 'error', payload: { error, valid } });
            return;
        }

        for (let item in payload) {
            let { valid, ...error } = item;
            dispatch({ type: 'error', payload: { error, valid } });
        }
    }, [dispatch]);

    const updateFormLoadingState = useCallback(function (loading = true, ok = true, message = '', single = true) {
        if (loading) {
            dispatch({ type: 'processing' });
            return;
        }

        if (ok) {
            dispatch({ type: 'success' });
            return;
        }

        dispatch({ type: 'failed', payload: { message: single ? message : message.split(' ') }});
    }, [dispatch]);

    return { formState: state, updateFormErrorState, updateFormLoadingState, checkForErrors };
}