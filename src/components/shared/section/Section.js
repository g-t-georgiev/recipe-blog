import { Outlet } from 'react-router-dom';

import './Section.css';

function Section() {
    return (
        <section>
            <Outlet />
        </section>
    );
}

export default Section;