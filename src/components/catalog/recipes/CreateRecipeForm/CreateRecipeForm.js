import Form from '../../../shared/form/Form';
import FormInput from '../../../shared/form-input/FormInput';
import FormButton from '../../../shared/form-button/FormButton';

import { validationSchema } from '../constants';

function CreateRecipeForm() {
    return (
        <Form name="recipeForm" title="Create new recipe" schema={validationSchema} redirect={true}>
            <FormInput type="text" name="title" id="title" placeholder="Title" />
            <FormInput type="text" name="description" id="description" placeholder="Description" />
            {/* <FormInput type="text" name="category" id="category" placeholder="Category" /> */}
            <FormInput type="text" name="imageUrl" id="image" placeholder="Image" />
            <FormButton text="Create" />
        </Form>
    )
}

export default CreateRecipeForm;