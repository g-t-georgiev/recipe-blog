import { createContext, useContext, useState, useCallback, useMemo } from "react";
import './Form.css';

export const FormContext = createContext(null);

export const useFormContext = function () {
    return useContext(FormContext);
};

function Form({ name, title = 'Fill in the form below', children }) {
    const [ isLoading, setLoading ] = useState(false);
    const [ responseError, setResponseError ] = useState(null);
    const [ inputError, setInputError ] = useState(null);

    const loadingStatus = useMemo(function () {
        return {
            get() {
                return isLoading;
            },
            set(value = false) {
                setLoading(value);
            }
        };
    }, [isLoading, setLoading]);

    const responseStatusError = useMemo(function () {
        return {
            get() {
                return responseError;
            },
            set(value = '') {
                setResponseError(value);
            },
            has() {
                return Boolean(responseError);
            }
        };
    }, [responseError, setResponseError]);

    const formError = useMemo(function () {
        return {
            get() {
                return inputError;
            },
            set(value = '') {
                setInputError(value);
            },
            has() {
                return Boolean(inputError);
            }
        };
    }, [inputError, setInputError]);

    const submitHandler = useCallback(function (e) {
        e.preventDefault();
        e.stopPropagation();

        const registerForm = e.currentTarget;
        const formFieldData = Object.fromEntries(new FormData(registerForm));

        console.log(formFieldData);

        console.log('Form submitted successfully.');
    }, []);

    return (
        <FormContext.Provider value={{ formError, responseStatusError, loadingStatus }}>
            <form className="form" name={name} autoComplete="off" onSubmit={submitHandler}>
                <legend className="form-title">{title}</legend>
                {responseStatusError.has() && <span className="response-error"></span>}
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;