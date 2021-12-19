import { createContext, useContext, useState, useCallback, useMemo } from "react";
import './Form.css';

// const usernamePattern = '^(?=[a-zA-Z0-9._\\-]{4,15}$)(?!.*[_.\\-]{2})[^_.\\-].*[^_.\\-]$';
// const emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])';
// const passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,15}$';

export const FormContext = createContext(null);

export const useFormContext = function () {
    return useContext(FormContext);
};

function Form({ name, title = 'Fill in the form below', children }) {
    const [ error, setError ] = useState(null);

    const formError = useMemo(function () {
        return {
            get() {
                return error;
            },
            set(value = '') {
                setError(value);
            },
            has() {
                return Boolean(error);
            }
        };
    }, [error, setError]);

    const submitHandler = useCallback(function (e) {
        e.preventDefault();
        e.stopPropagation();

        const registerForm = e.currentTarget;
        const formFieldData = Object.fromEntries(new FormData(registerForm));

        console.log(formFieldData);

        console.log('Form submitted successfully.');
    }, []);

    return (
        <FormContext.Provider value={formError}>
            <form className="form" name={name} autoComplete="off" onSubmit={submitHandler}>
                <legend className="form-title">{title}</legend>
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;