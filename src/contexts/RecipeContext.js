import { createContext, useContext } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

const RecipeContext = createContext(null);

export const useRecipeContext = function () {
    return useContext(RecipeContext);
};

export const RecipeContextProvider = function () {
    const { recipeId } = useParams();
    const location = useLocation();
    const resetted = Boolean(location.state);
    const fetchData = useFetch(`/data/recipes/${recipeId}`, false, false, resetted);
    const recipe = fetchData;

    return (
        <RecipeContext.Provider value={recipe}>
            <Outlet />
        </RecipeContext.Provider>
    );
}

export default RecipeContext;