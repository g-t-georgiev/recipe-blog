import { useFormContext } from '../../../contexts/FormContext';
import './FormButton.css';

function FormButton({ type = 'submit', text = 'Submit' }) {
    const { 
        formState,
        checkForErrors
    } = useFormContext();

    return (
        <div className="form-row">
            <button 
                className="form-button" 
                type={type} 
                disabled={formState.loading || checkForErrors()}>
                {formState.loading ? 'Loading...' : text}
            </button>
        </div>
    );
}

export default FormButton;