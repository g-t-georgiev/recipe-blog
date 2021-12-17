import { useCallback } from "react";
import './Form.css';
import FormInput from "../form-input/FormInput";
import FormButton from "../form-button/FormButton";
import FormFooter from "../form-footer/FormFooter";

function Form({ name, title = 'Fill in the form below', elements }) {

    const submitHandler = useCallback(function (e) {
        e.preventDefault();
        e.stopPropagation();

        const registerForm = e.currentTarget;
        const formFieldData = Object.fromEntries(new FormData(registerForm));

        console.log(formFieldData);

        console.log('Registered successfully.');
    }, []);

    const changeHandler = useCallback(function (e) {
        console.log(`${e.target.name} = ${e.target.value}`);
    });

    return (
        <form className="form" name={name} autoComplete="off" onSubmit={submitHandler} onChange={changeHandler}>
            <legend className="form-title">{title}</legend>
            {elements.inputs.map(({ id, ...props }) => <FormInput key={id} {...props} />)}
            <FormButton {...elements.button} />
            <FormFooter {...elements.footer} />
        </form>
    );
}

export default Form;