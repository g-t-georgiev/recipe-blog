import { useState, useCallback } from 'react';

import './FormInput.css';

import formInputValidator from './helpers/formInputValidator';

const initialValidationStatus = false;

const initialErrorState = {
    field: null,
    messages: [],
    visible: false
};

function FormInput({ type = 'text', name = '', placeholder = '', validationConditions = {} }) {
    const [ isValid, setValidationStatus ] = useState(initialValidationStatus);
    const [ error, setError ] = useState(initialErrorState);

    const changeValidationStatusHandler = useCallback(function (newValidationStatus, oldValidationStatus) {
        if (newValidationStatus === oldValidationStatus) {
            return;
        }

        setValidationStatus(newValidationStatus);
    }, [setValidationStatus]);

    const changeErrorStatusHandler = useCallback(function ({ field = '', messages = [], visible = false }) {
        setError(errorStatus => {
            return {
                ...errorStatus,
                field,
                messages,
                visible
            }
        })
    }, [setError]);

    const changeInputHandler = useCallback(function (e) {
        let value = e.currentTarget.value;
        value = value.trim();

        const { valid: hasPassedChecks, reasons } = formInputValidator(value, validationConditions);
        
        if (!hasPassedChecks) {
            changeValidationStatusHandler(hasPassedChecks, isValid);

            const newError = {
                field: name,
                messages: [ ...error.messages, ...reasons.split(' ') ],
                visible: isValid
            }

            changeErrorStatusHandler(newError);
        }

    }, [changeValidationStatusHandler, changeErrorStatusHandler, error.messages, isValid, name, validationConditions]);

    return (
        <div className="form-row">
            <input className="form-input" type={type} name={name} placeholder={placeholder} onChange={changeInputHandler} />
            {error.visible && <span className="form-input-validation-message"></span>}
        </div>
    );
}

export default FormInput;