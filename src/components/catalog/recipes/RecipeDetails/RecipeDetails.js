import { Link, useParams } from "react-router-dom";

import useFetch from "../../../../hooks/useFetch";
import { useAuthContext } from "../../../../contexts/AuthContext";

import './RecipeDetails.css';

function RecipeDetails() {
    const { recipeId } = useParams();
    const recipe = useFetch(`/data/recipes/${recipeId}`);
    const { user } = useAuthContext();

    if (['idle', 'fetching'].includes(recipe.status)) {
        return (
            <section className="reciped-details">
                Loading recipe...
            </section>
        );
    }

    if (recipe.status === 'error') {
        return (
            <section className="recipe-details">
                <h3>Error loading recipe data.</h3>
                <p>Issue: {recipe.error}</p>
            </section>
        );
    }

    return (
        <section className="recipe-details">
            <div className="recipe-details-image">
                <img src={recipe.data.imageUrl} alt={recipe.data.title} />
            </div>
            <div className="recipe-details-header">
                <h3 className="recipe-details-title">{recipe.data.title}</h3>
                <h4 className="recipe-details-category">Category: {recipe.data.category}</h4>
                <p className="recipe-details-author">Author: {recipe.data.author.username}</p>
                <p className="recipe-details-rating">Rating: {recipe.data.reviewCount && recipe.data.rating.reduce((rating, review) => rating += review.rating, 0) / recipe.data.reviewCount} / 5</p>
            </div>
            <div className="recipe-details-description">
                <h4>Description</h4>
                <p className="description-text">{recipe.data.description}</p>
            </div>
            {
                user.id === recipe.data.author._id.toString()
                && (
                    <div className="recipe-details-controls">
                        <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>
                        <Link to={`/recipes/${recipeId}/delete`}>Delete</Link>
                    </div>
                )
            }
        </section>
    );
}

export default RecipeDetails;