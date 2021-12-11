import './FormButton.css';

function FormButton({ type = 'submit', children = 'Submit' }) {
    return (
        <div className="form-row">
            <button className="form-button" type={type}>
                {children}
            </button>
        </div>
    );
}

export default FormButton;