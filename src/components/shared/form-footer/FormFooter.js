import { Link } from 'react-router-dom';
import './FormFooter.css';

function FormFooter({ span, link }) {
    return (
        <div className="form-row form-footer">
            <span>{span.text}</span> &nbsp;
            <Link to={link.to}>{link.text}</Link>
        </div>
    );
}

export default FormFooter;