import { useCallback } from 'react';
import { useFormContext } from '../../../contexts/FormContext';

import './FormInput.css';

import validator from '../form/helpers/validateInput';

function FormInput(props) {
    const { 
        schema,
        checkForErrors,
        updateFormState: {
            updateFormErrorState
        }
    } = useFormContext();

    const changeHandler = useCallback(function (e) {
        let results = validator(props.name, e.currentTarget.value, schema);
        updateFormErrorState(results);
    }, [validator, updateFormErrorState]);

    return (
        <div className="form-row">
            <div className="input-field">
                <label htmlFor={props.id}>
                    <input className={`form-input ${checkForErrors(props.name) ? 'invalid' : ''}`} {...props} onChange={changeHandler} />
                    <span id="label-text">
                        {props.placeholder}
                    </span>
                </label>
            </div>
            {
                checkForErrors(props.name, true, true)
                    .map(
                        (error, i) => (
                            <span key={error.name + i} className="error-message">
                                {error.message}
                            </span>
                        )
                    )
            }
        </div>
    );
}

export default FormInput;