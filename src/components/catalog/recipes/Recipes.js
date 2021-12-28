import { Outlet, useSearchParams } from 'react-router-dom';

function Recipes() {
    const [ searchParams, setSearchParams ] = useSearchParams();

    return (
        <section>
            <h2>
                {
                    searchParams.has('category') 
                    ? 'Category: ' + searchParams.get('category')
                    : 'All Recipes'
                }
            </h2>
            <Outlet />
        </section>
    );
}

export default Recipes;