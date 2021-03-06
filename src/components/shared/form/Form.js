import { useEffect, useRef, useCallback } from 'react';

import { useFormState } from '../../../hooks/useFormState';

import { FormContext } from '../../../contexts/FormContext';
import validator from './helpers/validateInput';

import './Form.css';

function Form({ name, title = 'Fill in the form below', schema, action, redirect, children }) {
    const { formState, updateFormState } = useFormState();
    const formRef = useRef();

    const submitHandler = useCallback(async function (e) {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        const formData = Object.fromEntries(new FormData(form));

        updateFormState(true);

        for (const field in formData) {
            let result = validator(field, formData[field], schema);

            if (result.length > 0) {
                updateFormState(false, false, 'All fields are required.');
                return;
            }
        }

        action(formData)
            .then(redirectHandler => {
                updateFormState(false, true);
                if (redirect) {
                    redirectHandler();
                }
            })
            .catch(error => {
                updateFormState(false, false, error.message, error?.multiple);
            });
    }, [action, schema, redirect, updateFormState]);

    useEffect(function () {
        let form = formRef.current;
        form?.addEventListener('submit', submitHandler);
        return function () {
            form?.removeEventListener('submit', submitHandler);
        }
    }, [submitHandler]);

    return (
        <FormContext.Provider value={{ schema, formState }}>
            <form className="form" name={name} autoComplete="off" ref={formRef} onSubmit={submitHandler}>
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