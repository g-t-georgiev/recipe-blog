import useFetch from '../../../../hooks/useFetch';
import useRecipeActions from '../../../../hooks/useRecipeActions';

import Form from '../../../shared/form/Form';
import FormInput from '../../../shared/form-input/FormInput';
import FormSelect from '../../../shared/form-select/FormSelect';
import FormButton from '../../../shared/form-button/FormButton';

import formatName from '../../../../helpers/formatName';
import { validationSchema } from '../constants';

function CreateRecipeForm() {
    const categories = useFetch('/data/categories');
    const action = useRecipeActions();

    return (
        <Form 
            name="recipeForm" 
            title="Create new recipe" 
            action={action.create} 
            schema={validationSchema} 
            redirect={true}
        >
            
            <FormInput 
                type="text" 
                name="title" 
                id="title" 
                placeholder="Title" 
            />

            <FormInput 
                type="text" 
                name="description" 
                id="description" 
                placeholder="Description" 
            />

            {
                categories.status === 'fetched'
                ? Array.isArray(categories.data) && categories.data.length > 0
                ? <FormSelect 
                    name="category" 
                    id="category" 
                    placeholder="Category"
                    options={
                        categories.data.map(
                            ({ title, _id }) => ({ value: formatName(title), id: _id })
                        )
                    } 
                />
                : <FormInput 
                    name="category" 
                    id="category" 
                    placeholder="Category" 
                    defaultValue="No categories"
                    disabled={true} 
                />
                : ['idle', 'fetching'].includes(categories.status)
                ? <FormInput 
                    name="category" 
                    id="category" 
                    placeholder="Category" 
                    defaultValue="Loading categories"
                    disabled={true}
                />
                : <FormInput 
                    name="category" 
                    id="category" 
                    placeholder="Category" 
                    defaultValue="Error loading categories" 
                    disabled={true}
                />
            }
            
            <FormInput 
                type="text" 
                name="imageUrl" 
                id="image" 
                placeholder="Image" 
            />

            <FormButton text="Create" />

        </Form>
    )
}

export default CreateRecipeForm;