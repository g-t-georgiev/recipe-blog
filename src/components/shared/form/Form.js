import { useCallback } from "react";
import { useFormState } from "../../../hooks/useFormState";

import './Form.css';

import { FormContext } from "../../../contexts/FormContext";
import validator from './helpers/validateInput';

function Form({ name, title = 'Fill in the form below', schema, action, children }) {
    const { formState, setFormState } = useFormState();

    const submitHandler = useCallback(function (e) {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        const formData = Object.fromEntries(new FormData(form));

        if (validator(formData, schema)
                .map(check => {
                    setFormState({ type: 'validate', payload: check });
                    return check;
                })
                .some(check => !check.valid)
        ) return;

        action.call(form, formData, setFormState);
    }, [setFormState, action, schema]);

    return (
        <FormContext.Provider value={formState}>
            <form className="form" name={name} autoComplete="off" onSubmit={submitHandler}>
                <legend className="form-title">{title}</legend>
                {
                    (!formState.loading && formState.submitted && formState.response) 
                    && 
                    Array.isArray(formState.response)
                        ? formState.response.map((error, i) => <span key={i} className="response-error">{error}</span>)
                        : <span className="response-error">{formState.response}</span>
                }
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;