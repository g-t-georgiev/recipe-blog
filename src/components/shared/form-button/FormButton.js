import { useFormContext } from '../form/Form';
import './FormButton.css';

const loadingStatusTitle = 'Processing data...';
const invalidStatusTitle = 'Please correct emty or invalid inputs before submitting.';

function FormButton({ type = 'submit', text = 'Submit' }) {
    const { loadingStatus, formStatus } = useFormContext();

    return (
        <div className="form-row">
            <button 
                className="form-button" 
                type={type} 
                disabled={!formStatus.valid() || loadingStatus} 
                title={
                    !formStatus.valid() 
                        ? invalidStatusTitle 
                        : loadingStatus 
                        ? loadingStatusTitle 
                        : text
                    }
                >
                {loadingStatus ? 'Loading...' : text}
            </button>
        </div>
    );
}

export default FormButton;