import { createContext, useContext, useState, useCallback, useMemo } from "react";
import './Form.css';

export const FormContext = createContext(null);

export const useFormContext = function () {
    return useContext(FormContext);
};

const responseStatusInitial = {
    ok: false,
    message: ''
};

const formStatusInitial = {
    submitted: false,
    fields: {}
};

function Form({ name, title = 'Fill in the form below', submitAction, children }) {
    const [isLoading, setLoadingStatus] = useState(false);
    const [response, setResponseStatus] = useState(responseStatusInitial);
    const [status, setStatus] = useState(function () {
        return children
            .filter(comp => {
                return comp.type.name === 'FormInput'
            })
            .reduce((status, comp) => {
                return {
                    ...status,
                    fields: {
                        ...status.fields,
                        [comp.props.name]: {
                            value: '',
                            valid: false,
                            touched: false,
                            message: ''
                        }
                    }
                }
            }, formStatusInitial);
    });

    const loadingStatus = useMemo(function () {
        return isLoading;
    }, [isLoading]);

    const updateLoadingStatus = useCallback(function (value) {
        setLoadingStatus(value);
    }, [setLoadingStatus]);

    const responseStatus = useMemo(function () {
        return response.ok;
    }, [response]);

    const updateResponseStatus = useCallback(function ({ ok, message }) {
        setResponseStatus((status) => {
            return {
                ...status,
                ok,
                message
            }
        })
    }, [setResponseStatus]);

    const formStatus = useMemo(function () {
        return {
            get(name) {
                return status.fields[name];
            },
            valid() {
                return Object
                    .keys(status.fields)
                    .reduce((acc, field) => status.fields[field].valid && acc, true);
            },
            set(name, value, valid, message) {
                setStatus(function (status) {
                    return {
                        ...status,
                        fields: {
                            ...status.fields,
                            [name]: {
                                value,
                                valid,
                                touched: true,
                                message
                            }
                        }
                    };
                });
            }
        }
    }, [status, setStatus]);

    const submitHandler = useCallback(function (e) {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        const formFieldData = Object.fromEntries(new FormData(form));

        console.log(formFieldData);

        submitAction();
    }, []);

    return (
        <FormContext.Provider value={{ loadingStatus, responseStatus, formStatus }}>
            <form className="form" name={name} autoComplete="off" onSubmit={submitHandler}>
                <legend className="form-title">{title}</legend>
                {(!isLoading && status.submitted && !response.ok) && <span className="response-error">{response.message}</span>}
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;