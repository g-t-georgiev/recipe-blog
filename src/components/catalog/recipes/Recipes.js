import { Outlet } from 'react-router-dom';

function Recipes() {
    return (
        <section>
            <Outlet />
        </section>
    );
}

export default Recipes;