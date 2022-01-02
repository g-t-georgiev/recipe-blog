import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <section>
            <h2>Ooops, something went wrong...</h2>
            <h3>We are terribly sorry. :(</h3>
            <p>Try refreshing the page or navigate to <Link to="/">home</Link> page.</p>
            <p>If you still are experiencing problems contact our support team.</p>
        </section>
    );
}

export default ErrorPage;