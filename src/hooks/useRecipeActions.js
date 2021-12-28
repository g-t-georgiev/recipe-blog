import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import * as recipeService from '../services/recipeService';

function useRecipeActions() {
    const redirectTo = useNavigate();

    const create = useCallback(async function ({ title, description, category, imageUrl}) {
        title = title.toLowerCase();
        category = category.toLowerCase();
        imageUrl = imageUrl.toLowerCase();

        await recipeService.create(title, description, category, imageUrl);
        return () => redirectTo('/recipes', { replace: true });
    }, [redirectTo]);

    const update = useCallback(async function (recipeId, { title, description, category, imageUrl }) {
        title = title.toLowerCase();
        category = category.toLowerCase();
        imageUrl = imageUrl.toLowerCase();
        
        await recipeService.update(recipeId, title, description, category, imageUrl);
        return () => redirectTo(`/recipes/${recipeId}`, { replace: true });
    }, [redirectTo]);

    const remove = useCallback(async function (recipeId) {
        await recipeService.remove(recipeId);
        return () => redirectTo('/recipes', { replace: true });
    }, [redirectTo]);

    return { create, update, remove };
}

export default useRecipeActions;