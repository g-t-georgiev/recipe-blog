import { useFormContext } from '../form/Form';
import './FormButton.css';

function FormButton({ type = 'submit', text = 'Submit' }) {
    const formError = useFormContext();

    return (
        <div className="form-row">
            <button className="form-button" type={type} disabled={!formError.has()}>
                {text}
            </button>
        </div>
    );
}

export default FormButton;