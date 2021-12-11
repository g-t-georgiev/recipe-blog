import { useCallback } from "react";

import './Form.css';

function Form({ formSubmitAction, formTitle = 'Fill in the form below', children }) {
    const submitHandler = useCallback(function (e) {
        e.preventDefault();
        e.stopPropagation();

        formSubmitAction();
    }, [formSubmitAction]);

    return (
        <form className="form" autoComplete="off" onSubmit={submitHandler}>
            <legend className="form-title">{formTitle}</legend>
            {children}
        </form>
    );
}

export default Form;