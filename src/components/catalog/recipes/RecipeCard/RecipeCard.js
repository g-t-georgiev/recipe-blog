import { Link } from 'react-router-dom';

import './RecipeCard.css';

import { formatName } from '../constants';

function RecipeCard({ data }) {
    return (
        <div className="recipe">
            <div className="recipe-image">
                <img src={data.imageUrl} alt={data.title} />
            </div>
            <div className="recipe-info">
                <h4 className="recipe-title">{data.title}</h4>
                <p className="recipe-category">Category: {formatName(data.category)}</p>
                <p className="recipe-author">Author: {data.author.username}</p>
                <p>Rating: {data.reviewCount && data.rating.reduce((rating, review) => rating += review.rating, 0) / data.reviewCount} / 5</p>
                <Link className="recipe-details-button" to={`/recipes/${data._id}`}>Details</Link>
            </div>
        </div>
    );
}

export default RecipeCard;