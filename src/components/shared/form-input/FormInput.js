import { useState, useMemo, useCallback } from 'react';
import { useFormContext } from '../form/Form';
import './FormInput.css';

function FormInput(props) {
    const [ value, setValue ] = useState('');
    const [ error, setError ] = useState(null);

    const formError = useFormContext();

    const inputError = useMemo(function () {
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

    const changeHandler = useCallback(function (e) {
        const inputValue = e.currentTarget.value;
        let message = '';

        if (props.name === 'username') {
            if (inputValue.length < 4) {
                message = 'Username should be at least 4 characters long.';
            }

            if (inputValue.length > 15) {
                message = 'Username should be 15 characters long at maximum.';
            }

            if (!/[a-z0-9_.\-]/gi.test(inputValue)) {
                message = 'Username should contain only english letters, digits and a dot, hyphen or underscore as word separator.';
            }

            if (!/^(?![_.\-])[a-z0-9_.\-]+(?<![_.\-])$/i.test(inputValue)) {
                message = 'Username should start and end with a letter or a digit only.';
            }

            message && inputError.set(message);
        }
        setValue(e.target.value);
    }, [setValue]);

    return (
        <div className="form-row">
            <div className={`input-field ${formError.has() || inputError.has() ? 'invalid' : 'valid'}`}>
                <label htmlFor={props.id}>
                    <input className="form-input" {...props} onChange={changeHandler} />
                    <span id="label-text">
                        {props.placeholder}
                    </span>
                </label>
                <i className="info-icon">{formError.has() || inputError.has() ? '\u2716' : '\u2713'}</i>
            </div>
            <span className="error-message">{formError.get() || inputError.get() || 'Looks great.'}</span>
        </div>
    );
}

export default FormInput;