import { createContext, useContext } from "react";

export const FormContext = createContext(null);

export const useFormContext = function () {
    return useContext(FormContext);
};