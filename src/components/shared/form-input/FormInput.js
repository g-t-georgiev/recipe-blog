import './FormInput.css';

function FormInput({ error, ...props }) {
    return (
        <div className="form-row">
            <label htmlFor={props.id}>
                <input className="form-input" {...props} />
                <span id="label-text">
                    {props.placeholder}
                </span>
                <i className="info-icon">{error ? '\u2716' : '\u2713'}</i>
                <span className="error-message">{error || 'Looks great.'}</span>
            </label>
        </div>
    );
}

export default FormInput;