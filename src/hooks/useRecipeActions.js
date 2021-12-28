import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import * as recipeService from '../services/recipeService';

function useRecipeActions() {
    const redirectTo = useNavigate();

    const create = useCallback(function ({ title, description, category, imageUrl}) {
        await recipeService.create(title, description, category, imageUrl);
        return () => redirectTo('/recipes');
    }, [redirectTo]);

    const update = useCallback(function (recipeId, { title, description, category, imageUrl }) {
        await recipeService.update(recipeId, title, description, category, imageUrl);
        return () => redirectTo(`/recipes/${recipeId}`);
    }, [redirectTo]);

    const remove = useCallback(function (recipeId) {
        await recipeService.remove(recipeId);
        return () => redirectTo('/recipes', { replace: true });
    }, [redirectTo]);

    return { create, update, remove };
}

export default useRecipeActions;