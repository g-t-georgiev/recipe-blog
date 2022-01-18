import { useParams } from 'react-router-dom';

import { useRecipeContext } from '../../../../contexts/RecipeContext';
import useFetch from '../../../../hooks/useFetch';
import useRecipeActions from '../../../../hooks/useRecipeActions';

import Form from '../../../shared/form/Form';
import FormInput from '../../../shared/form-input/FormInput';
import FormSelect from '../../../shared/form-select/FormSelect';
import FormButton from '../../../shared/form-button/FormButton';

import formatName from '../../../../helpers/formatName';
import { validationSchema } from '../constants';

function EditRecipeForm() {
    const { recipeId } = useParams();
    const categories = useFetch('/data/categories');
    const recipe = useRecipeContext();
    const action = useRecipeActions();

    if (['idle', 'fetching'].includes(categories.status) ||
        ['idle', 'fetching'].includes(recipe.status)) {
        return (
            <section>
                <h2>Loading data...</h2>
            </section>
        );
    }

    if (categories.status === 'error') {
        return (
            <section>
                <h2>Error loading data</h2>
                <p>Issue: {categories.error}</p>
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
            title="Edit recipe" 
            action={action.update.bind(null, recipeId)} 
            schema={validationSchema} 
            redirect={true}
        >
            
            <FormInput 
                type="text" 
                name="title" 
                id="title" 
                placeholder="Title" 
                defaultValue={
                    formatName(recipe.data.title)
                } 
            />

            <FormInput 
                type="text" 
                name="description" 
                id="description" 
                placeholder="Description" 
                defaultValue={recipe.data.description} 
            />

            <FormSelect 
                name="category" 
                id="category" 
                placeholder="Category" 
                defaultValue={
                    formatName(recipe.data.category)
                } 
                options={
                    categories.data.map(
                        ({ title, _id }) => ({ value: formatName(title), id: _id })
                    )
                } 
            />

            <FormInput 
                type="text" 
                name="imageUrl" 
                id="image" 
                defaultValue={recipe.data.imageUrl} 
                placeholder="Image" 
            />

            <FormButton text="Edit" />

        </Form>
    )
}

export default EditRecipeForm;