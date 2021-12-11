import './FormFooter.css';

function FormFooter({ children }) {
    return (
        <div className="form-row form-footer">
            <span>
                {children}
            </span>
        </div>
    );
}

export default FormFooter;