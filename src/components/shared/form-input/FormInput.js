import { useState, useCallback } from 'react';
import './FormInput.css';

function FormInput({ error, ...props }) {
    const [ value, setValue ] = useState('');
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