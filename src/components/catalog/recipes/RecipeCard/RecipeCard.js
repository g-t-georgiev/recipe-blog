function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <div className="recipe-card-image">
                <img src={recipe.imageUrl} alt={recipe.title} />
            </div>
            <div className="recipe-card-info">
                <h4 className="recipe-card-info-title">{recipe.title}</h4>
                <p className="recipe-card-info-category">{recipe.category}</p>
                <p className="recipe-card-info-autho">{recipe.author.username}</p>
                <p>Rating: {reviewCount && recipe.rating.reduce((rating, review) => rating += review.rating, 0) / recipe.reviewCount}</p>
                <button className="recipe-card-details-button">Details</button>
            </div>
        </div>
    );
}

export default RecipeCard;