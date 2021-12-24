import { useFormContext } from '../../../contexts/FormContext';

import './FormInput.css';

function FormInput(props) {
    const formState = useFormContext();

    return (
        <div className="form-row">
            <div className="input-field">
                <label htmlFor={props.id}>
                    <input className={`form-input ${formState.hasErrors(props.name) ? 'invalid' : ''}`} {...props} />
                    <span id="label-text">
                        {props.placeholder}
                    </span>
                </label>
            </div>
            {
                formState.hasErrors(props.name)
                && formState.getErrors(props.name)
                    .map(
                        (error) => (
                            <span key={error.name + error.message} className="error-message">
                                {error.message}
                            </span>
                        )
                    )
            }
        </div>
    );
}

export default FormInput;