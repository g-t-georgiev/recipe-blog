import { useFormContext } from '../form/Form';
import './FormButton.css';

function FormButton({ type = 'submit', text = 'Submit' }) {
    const { formError, loadingStatus } = useFormContext();

    return (
        <div className="form-row">
            <button className="form-button" type={type} disabled={!formError.has()}>
                {loadingStatus.get() ? 'Loading...' : text}
            </button>
        </div>
    );
}

export default FormButton;