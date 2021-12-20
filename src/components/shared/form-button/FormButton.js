import { useFormContext } from '../form/Form';
import './FormButton.css';

function FormButton({ type = 'submit', text = 'Submit' }) {
    const { loadingStatus, formStatus } = useFormContext();

    return (
        <div className="form-row">
            <button 
                className="form-button" 
                type={type} 
                disabled={!formStatus.valid()} 
                title={!formStatus.valid() ? 'Correct empty/invalid inputs before submitting.' : text}>
                {loadingStatus ? 'Loading...' : text}
            </button>
        </div>
    );
}

export default FormButton;