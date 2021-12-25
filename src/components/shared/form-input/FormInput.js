import { useState, useCallback } from 'react';
import { useFormContext } from '../../../contexts/FormContext';

import './FormInput.css';

import validator from '../form/helpers/validateInput';

const initialState = {
    message: '',
    valid: false,
    touched: false
};

function FormInput(props) {
    const [inputState, setInputState] = useState(initialState);
    const { schema } = useFormContext();

    const changeHandler = useCallback(function (e) {
        let message = validator(props.name, e.currentTarget.value, schema);

        setInputState(function (state) {
            return {
                ...state,
                valid: message.length === 0,
                touched: true,
                message
            }
        });
    }, [props.name, schema]);

    return (
        <div className="form-row">
            <div className="input-field">
                <label htmlFor={props.id}>
                    <input className={`form-input ${inputState.touched && !inputState.valid ? 'invalid' : ''}`} {...props} onChange={changeHandler} />
                    <span id="label-text">
                        {props.placeholder}
                    </span>
                </label>
            </div>
            {
                inputState.touched &&
                !inputState.valid &&
                <span className="error-message">
                    {inputState.message}
                </span>
            }
        </div>
    );
}

export default FormInput;