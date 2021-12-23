import { useCallback } from "react";
import './Form.css';

import { FormContext } from "../../../contexts/FormContext";
import { useFormState } from "../../../hooks/useFormState";

function Form({ name, title = 'Fill in the form below', submitAction, children }) {
    const { formState, setFormState } = useFormState();

    const submitHandler = useCallback(function (e) {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        const formFieldData = Object.fromEntries(new FormData(form));

        submitAction.call(this, formFieldData, );
    }, []);

    

    return (
        <FormContext.Provider value={{ ...formState }}>
            <form className="form" name={name} autoComplete="off" onSubmit={submitHandler}>
                <legend className="form-title">{title}</legend>
                {(!formState.loading && formState.submitted && !formState.response.ok) && <span className="response-error">{formState.response.message}</span>}
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;