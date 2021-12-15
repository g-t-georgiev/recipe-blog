import './FormButton.css';

function FormButton({ type = 'submit', text = 'Submit' }) {
    return (
        <div className="form-row">
            <button className="form-button" type={type}>
                {text}
            </button>
        </div>
    );
}

export default FormButton;