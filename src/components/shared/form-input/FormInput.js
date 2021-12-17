import './FormInput.css';

function FormInput({ error, ...props }) {
    return (
        <div className="form-row">
            <label htmlFor={props.id}>{props.placeholder}</label>
            <input className="form-input" {...props} />
            <i className="info-icon">@</i>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
}

export default FormInput;