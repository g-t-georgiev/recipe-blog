import { useCallback } from 'react';
import { useFormContext } from '../form/Form';
import './FormInput.css';
import validator from '../form/helpers/validateInput';

function FormInput(props) {
    const { loadingStatus, responseStatus, formStatus } = useFormContext();

    const input = formStatus.get(props.name);

    const changeHandler = useCallback(function (e) {
        const validationResult = validator(e.currentTarget.name, e.currentTarget.value);
        formStatus.set(e.currentTarget.name, e.currentTarget.value, validationResult.valid, validationResult.message);
    }, [formStatus]);

    return (
        <div className="form-row">
            <div className={`input-field ${!(responseStatus || input.valid) ? 'invalid' : 'valid'}`}>
                <label htmlFor={props.id}>
                    <input className="form-input" {...props} disabled={loadingStatus} onChange={changeHandler} />
                    <span id="label-text">
                        {props.placeholder}
                    </span>
                </label>
                {(input.touched && input.value.length > 0) && <i className="info-icon">{!input.valid ? '\u2716' : '\u2713'}</i>}
            </div>
            {(input.touched && input.value.length > 0 && !input.valid) && <span className="error-message">{input.message}</span>}
        </div>
    );
}

export default FormInput;