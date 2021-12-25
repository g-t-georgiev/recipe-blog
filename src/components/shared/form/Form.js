import { useCallback } from "react";
import { useFormState } from "../../../hooks/useFormState";

import './Form.css';

import { FormContext } from "../../../contexts/FormContext";

function Form({ name, title = 'Fill in the form below', schema, action, children }) {
    const { checkForErrors, formState, ...updateFormState } = useFormState();

    const submitHandler = useCallback(function (e) {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        const formData = Object.fromEntries(new FormData(form));

        if (checkForErrors()) return;

        action.call(form, formData, updateFormState);
    }, [setFormState, action, schema]);

    return (
        <FormContext.Provider value={{ schema, checkForErrors, formState, updateFormState }}>
            <form className="form" name={name} autoComplete="off" onSubmit={submitHandler}>
                <legend className="form-title">{title}</legend>
                {
                    (!formState.loading && formState.submitted && formState.response) 
                    && Array.isArray(formState.response)
                    ? formState.response.map((error, i) => <span key={i} className="response-error">{error}</span>)
                    : <span className="response-error">{formState.response}</span>
                }
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;