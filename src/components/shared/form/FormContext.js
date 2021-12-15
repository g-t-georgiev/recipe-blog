import { createContext, useContext, useState, useCallback } from 'react';

const FormContext = createContext(null);

export const useFormContext = function () {
    const { status, dispatch } = useContext(FormContext);
    return [ status, dispatch ];
};

export function FormContextProvider({ children }) {
    const [ status, setStatus ] = useState(false);

    const dispatch = useCallback(function (value) {
        setStatus(value);
    }, [setStatus]);

    return (
        <FormContext.Provider value={{ status, dispatch }}>
            {children}
        </FormContext.Provider>
    );
}

export default FormContext;