import { useReducer } from "react";

const reducer = function (state, { type, payload }) {
    switch (type) {
        case 'validate': {
            if (payload.valid) {
                if (state.hasErrors(payload.name)) {
                    return {
                        ...state,
                        errors: state.errors.filter(error => error.name !== payload.name)
                    }
                } else {
                    return state;
                }
            } else {
                if (state.hasErrors(payload.name)) {
                    return state.getErrors(payload.name).some(error => error.message === payload.message)
                        ? state
                        : {
                            ...state,
                            errors: state.errors.concat(payload)
                        }
                } else {
                    return {
                        ...state,
                        errors: state.errors.concat(payload)
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
    errors: [],
    getErrors(name) {
        return this.errors.filter(error => error.name === name);
    },
    hasErrors(name) {
        return this.errors.some(error => error.name === name);
    }
};

export function useFormState() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return { formState: state, setFormState: dispatch };
}