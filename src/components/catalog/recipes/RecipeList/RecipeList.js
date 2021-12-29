import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import useFetch from '../../../../hooks/useFetch';
import { useAuthContext } from '../../../../contexts/AuthContext';

import RecipeCard from '../RecipeCard/RecipeCard';

import './RecipeList.css';

function RecipeList(props) {
    const { user } = useAuthContext();
    const [searchParams ] = useSearchParams();
    const path = useMemo(function () {
        let category = (props.category || searchParams.get('category')) ?? '';
        // let page = (props.page || searchParams.get('page')) ?? '1';
        // let show = (props.show || searchParams.get('show')) ?? '5';

        let path = category && `?category=${category}`;
        return path;
    }, [props.category, searchParams]);

    const recipes = useFetch('/data/recipes' + path, user.isLoggedIn);

    return (
        <>
            <h2>
                {
                    props.category || searchParams.has('category')
                    ? 'Category: ' + searchParams.get('category')
                    : props.title ?? 'All Recipes'
                }
            </h2>

            <section className="recipe-list">
                {
                    recipes.status === 'fetched'
                        ? Array.isArray(recipes.data) && recipes.data.length > 0
                            ? recipes.data.map(recipe => <RecipeCard key={recipe._id} data={recipe} />)
                            : (
                                <section className="info-box">
                                    <h3>No recipes to show</h3>
                                    <p>Contribute by <Link to="/recipes/create">adding</Link> some of yours.</p>
                                </section>
                            )
                        : ['idle', 'fetching'].includes(recipes.status)
                            ? (
                                <section className="info-box">
                                    <h3>Loading...</h3>
                                    <p>Please, wait. We are fetching some data for you.</p>
                                </section>
                            )
                            : (
                                <section className="info-box">
                                    <h3>Oops, something went wrong while getting recipes data.</h3>
                                    <p>Issue: {recipes.error}</p>
                                </section>
                            )

                }
            </section>
        </>
    );
}

export default RecipeList;