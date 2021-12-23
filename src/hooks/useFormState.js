import { useReducer } from "react";

const reducer = function (state, { type, payload }) {
    const newState = { ...state };
    let { errors, response } = newState;

    switch (type) {
        case 'validating': {
            newState.errors = [ ...errors, ...payload.errors ];
        }

        case 'processing': {
            newState.submitted = true;
            newState.loading = true;
            break;
        }

        case 'succeeded': {
            newState.loading = false;
            newState.errors = [];
            newState.response = { ok: true, message: '' };
            break;
        }

        case 'failed': {
            newState.loading = false;
            newState.errors = [ ...errors, ...payload.errors ];
            newState.response = { ...response, ...payload.response };
            break;
        }
    }

    return newState;
};

const initialState = {
    loading: false,
    submitted: false,
    errors: [],
    response: {
        ok: false,
        message: ''
    },
    get valid() {
        return this.errors.length > 0;
    }
};

export function useFormState() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return { formState: state, setFormState: dispatch };
}