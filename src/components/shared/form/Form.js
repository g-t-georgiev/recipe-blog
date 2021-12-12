import { useState, useCallback, createContext } from "react";

import './Form.css';

export const FormContext = createContext(null);

function FormContextProvider({ children }) {
    const [valid, setValid] = useState(false);

    const form = {
        valid,
        changeValidationStatus(value) {
            setValid(value);
        }
    };

    return (
        <FormContext.Provider value={form}>
            {children}
        </FormContext.Provider>
    );
}

function Form({ name, title = 'Fill in the form below', children }) {

    const submitHandler = useCallback(function (e) {
        e.preventDefault();
        e.stopPropagation();

        const registerForm = e.currentTarget;
        const formFieldData = Object.fromEntries(new FormData(registerForm));

        console.log(formFieldData);

        console.log('Registered successfully.');
    }, []);

    return (
        <FormContextProvider>
            <form className="form" name={name} autoComplete="off" onSubmit={submitHandler}>
                <legend className="form-title">{title}</legend>
                {children}
            </form>
        </FormContextProvider>
    );
}

export default Form;