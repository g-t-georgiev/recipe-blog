import { Link, useParams } from 'react-router-dom';

import useFetch from '../../../../hooks/useFetch';

import RecipeCard from '../recipe-card/RecipeCard';

import '../recipe-list/RecipeList.css';

function MyRecipesList() {
    const { userId } = useParams();
    const recipes = useFetch(`/users/${userId}/recipes`, true);

    return (
        <>
            <h2>My Recipes</h2>

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
                                <>
                                    <h3>Oops, something went wrong while getting recipes data.</h3>
                                    <p>Issue: {recipes.error}</p>
                                </>
                            )

                }
            </section>
        </>
    );
}

export default MyRecipesList;