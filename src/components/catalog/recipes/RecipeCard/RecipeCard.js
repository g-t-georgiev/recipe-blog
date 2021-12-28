function RecipeCard({ data }) {
    return (
        <div className="recipe-card">
            <div className="recipe-card-image">
                <img src={data.imageUrl} alt={data.title} />
            </div>
            <div className="recipe-card-info">
                <h4 className="recipe-card-info-title">{data.title}</h4>
                <p className="recipe-card-info-category">{data.category}</p>
                <p className="recipe-card-info-autho">{data.author.username}</p>
                <p>Rating: {data.reviewCount && data.rating.reduce((rating, review) => rating += review.rating, 0) / data.reviewCount}</p>
                <button className="recipe-card-details-button">Details</button>
            </div>
        </div>
    );
}

export default RecipeCard;