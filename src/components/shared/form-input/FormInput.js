// import { useCallback } from 'react';
// import { useFormContext } from '../form/FormContext';
import './FormInput.css';

function FormInput({ error, ...props }) {
    // const [ formStatus, setFormStatus ] = useFormContext();

    // const changeHandler = useCallback(function (e) {
        
    // }, []);

    return (
        <div className="form-row">
            <input className="form-input" {...props} />
            <span className="error-message">{error}</span>
        </div>
    );
}

export default FormInput;