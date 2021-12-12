import { useState, useContext } from 'react';

import { FormContext } from '../Form';

import './FormInput.css';

const initialFieldStatus = {
    name: '',
    value: '',
    message: '',
    valid: false,
    touched: false 
};

function FormInput({ type = 'text', name, placeholder }) {
    const [field, setField] = useState(initialFieldStatus);

    const form = useContext(FormContext);

    function changeHandler(e) {
        const currentValue = e.currentTarget.value;

        if (currentValue.length < 4) {
            setField(status => {
                return {
                    ...status,
                    name,
                    value: currentValue,
                    valid: false,
                    touched: true,
                    message: `Provided ${name} should be at least 4 characters long.`
                }
            });

            form.changeValidationStatus(false);
        } else {
            setField(status => {
                return {
                    ...status,
                    name,
                    value: currentValue,
                    valid: true,
                    message: ''
                }
            });

            form.changeValidationStatus(true);
        }
        
    }

    return (
        <div className="form-row">
            <input className="form-input" type={type} name={name} placeholder={placeholder} onChange={changeHandler} />
            {
                (!field.valid && field.touched) 
                && 
                <span className="form-input-validation-message">{field.message}</span>
            }
        </div>
    );
}

export default FormInput;