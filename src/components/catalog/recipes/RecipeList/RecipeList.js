import { useMemo } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import useFetch from '../../../../hooks/useFetch';

function RecipeList() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const path = useMemo(function () {
        return searchParams.has('category')
        ? `?category=${searchParams.get('category')}`
        : '';
    }, [searchParams]);

    const recipes = useFetch('/data/recipes' + path);

    if (['idle', 'fetching'].includes(recipes.status)) {
        return (
            <section>
                <h3>Loading...</h3>
            </section>
        );
    }

    return (
        <>
            {
                recipes.status === 'fetched'
                ? recipes.data && recipes.data.length > 0
                ? <ul>{recipes.data.map(recipe => <li key={recipe._id}>{recipe.title}</li>)}</ul>
                : <section>
                    <h3>No recipes to show</h3>
                    <p>Start <Link to="/recipes/create">adding</Link> some of yours.</p>
                </section>
                : <section>
                    <h3>Oops, something went wrong while getting recipes data.</h3>
                    <p>Issue: {recipes.error}</p>
                </section>
            }
        </>
    );
}

export default RecipeList;