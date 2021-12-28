import './RecipeCard.css';

function RecipeCard({ data }) {
    return (
        <div className="recipe">
            <div className="recipe-info">
                <div className="recipe-image">
                    <img src={data.imageUrl} alt={data.title} />
                </div>
                <h4 className="recipe-title">{data.title}</h4>
                <p className="recipe-category">{data.category[0].toUpperCase() + data.category.slice(1)}</p>
                <p className="recipe-author">{data.author.username}</p>
                <p>Rating: {data.reviewCount && data.rating.reduce((rating, review) => rating += review.rating, 0) / data.reviewCount}</p>
            </div>
            <button className="recipe-details-button">Details</button>
        </div>
    );
}

export default RecipeCard;