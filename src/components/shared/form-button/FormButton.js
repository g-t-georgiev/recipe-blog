import './FormButton.css';

function FormButton({ type = 'submit', disabled = true, text = 'Submit' }) {
    return (
        <div className="form-row">
            <button className="form-button" type={type} disabled={disabled}>
                {text}
            </button>
        </div>
    );
}

export default FormButton;