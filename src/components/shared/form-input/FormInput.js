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
        setValue(e.target.value);
    }, [setValue]);

    return (
        <div className="form-row">
            <div className={`input-field ${error ? 'invalid' : 'valid'}`}>
                <label htmlFor={props.id}>
                    <input className="form-input" {...props} onChange={changeHandler} />
                    <span id="label-text">
                        {props.placeholder}
                    </span>
                    <i className="info-icon">{error ? '\u2716' : '\u2713'}</i>
                    <span className="error-message">{error || 'Looks great.'}</span>
                </label>
            </div>
            {(value && error) && <span className="error-message">{error}</span>}
        </div>
    );
}

export default FormInput;