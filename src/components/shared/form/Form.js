import { useState, useCallback } from "react";
import './Form.css';
import FormInput from "../form-input/FormInput";
import FormButton from "../form-button/FormButton";
import FormFooter from "../form-footer/FormFooter";

const initialFormState = {
    valid: false,
    fields: {
        username: {
            id: 1,
            error: null,
            props: {
                type: 'text',
                name: 'username',
                id: 'username',
                placeholder: 'Username',
                required: true,
                pattern: '^(?=[a-zA-Z0-9._\\-]{4,15}$)(?!.*[_.\\-]{2})[^_.\\-].*[^_.\\-]$'
            }
        },
        email: {
            id: 2,
            error: null,
            props: {
                type: 'email',
                name: 'email',
                id: 'email',
                placeholder: 'Email',
                required: true,
                pattern: '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])'
            }
        },
        password: {
            id: 3,
            error: null,
            props: {
                type: 'password',
                name: 'password',
                id: 'password',
                placeholder: 'Password',
                required: true,
                pattern: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,15}$'
            }
        }
    },
    buttons: {
        submit: {
            type: 'submit',
            text: 'Submit'
        }
    },
    footer: {
        span: {
            text: ''
        },
        link: {
            text: '',
            to: ''
        }
    }
};

function Form({ name, title = 'Fill in the form below', elements }) {
    const [ formState, setFormState ] = useState(function () {

        elements.inputs.forEach(function (input) {
            initialFormState[input.name].props.required = input.required;
            return;
        });

        elements.buttons.forEach(function (button) {
            initialFormState[button.type].text = button.text;
            return;
        });

        initialFormState.footer.span.text = elements.footer.span.text;
        initialFormState.footer.link.to = elements.footer.link.to;
        initialFormState.footer.link.text = elements.footer.link.text;

        return initialFormState;
    });

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
            {formState.fields.map(({ id, props }) => <FormInput key={id} {...props} />)}
            {formState.buttons.map((button, i) => <FormButton key={i + 1} {...button} />)}
            <FormFooter {...formState.footer} />
        </form>
    );
}

export default Form;