import { useParams } from 'react-router-dom';

import { useRecipeContext } from '../../../../contexts/RecipeContext';
import useRecipeActions from '../../../../hooks/useRecipeActions';

import Form from '../../../shared/form/Form';
import FormInput from '../../../shared/form-input/FormInput';
import FormButton from '../../../shared/form-button/FormButton';

import formatName from '../../../../helpers/formatName';
import { validationSchema } from '../constants';

function DeleteRecipeForm() {
    const { recipeId } = useParams();
    const recipe = useRecipeContext();
    const action = useRecipeActions();

    if (['idle', 'fetching'].includes(recipe.status)) {
        return (
            <section>
                <h2>Loading data...</h2>
            </section>
        );
    }

    if (recipe.status === 'error') {
        return (
            <section>
                <h2>Error loading data</h2>
                <p>Issue: {recipe.error}</p>
            </section>
        );
    }

    return (
        <Form 
            name="recipeForm" 
            title="Delete recipe" 
            action={action.remove.bind(null, recipeId)} 
            schema={validationSchema} 
            redirect={true}
        >

            <FormInput 
                type="text" 
                name="title" 
                id="title" 
                disabled={true} 
                placeholder="Title" 
                defaultValue={
                    formatName(recipe.data.title)
                } 
            />

            <FormInput 
                type="text" 
                name="description" 
                id="description" 
                disabled={true} 
                placeholder="Description" 
                defaultValue={recipe.data.description} 
            />

            <FormInput 
                type="text" 
                name="category" 
                id="category" 
                placeholder="Category" 
                disabled={true} 
                defaultValue={
                    formatName(recipe.data.category)
                } 
            />

            <FormInput 
                type="text" 
                name="imageUrl" 
                id="image" 
                disabled={true} 
                defaultValue={recipe.data.imageUrl} 
                placeholder="Image" 
            />

            <FormButton text="Delete" />
            
        </Form>
    )
}

export default DeleteRecipeForm;