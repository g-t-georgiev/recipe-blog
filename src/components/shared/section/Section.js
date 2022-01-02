import { Outlet } from 'react-router-dom';

function Section({ children }) {
    return (
        <section>
            <Outlet />
        </section>
    );
}

export default Section;