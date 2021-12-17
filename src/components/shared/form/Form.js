import { useState, useCallback } from "react";
import './Form.css';
import FormInput from "../form-input/FormInput";
import FormButton from "../form-button/FormButton";
import FormFooter from "../form-footer/FormFooter";

const usernamePattern = '^(?=[a-zA-Z0-9._\\-]{4,15}$)(?!.*[_.\\-]{2})[^_.\\-].*[^_.\\-]$';
const emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])';
const passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,15}$';

const fieldSchema = {
    create(key, error, { type, name, id, placeholder, pattern, required }) {
        return {
            key,
            error,
            props: {
                type,
                name,
                id,
                placeholder,
                pattern,
                required
            }
        }
    }
}

const initialFormState = {
    valid: false,
    name: '',
    elements: {
        fields: {
            loginForm: {
                email: fieldSchema.create(
                    1,
                    null,
                    {
                        type: 'email',
                        name: 'email',
                        id: 'email',
                        placeholder: 'Email',
                        pattern: emailPattern,
                        required: true
                    }
                ),
                password: fieldSchema.create(
                    2,
                    null,
                    {
                        type: 'password',
                        name: 'password',
                        id: 'password',
                        placeholder: 'Password',
                        pattern: passwordPattern,
                        required: true
                    }
                )
            },
            registerForm: {
                username: fieldSchema.create(
                    1,
                    null,
                    {
                        type: 'username',
                        name: 'username',
                        id: 'username',
                        placeholder: 'Username',
                        pattern: usernamePattern,
                        required: true
                    }
                ),
                email: fieldSchema.create(
                    2,
                    null,
                    {
                        type: 'email',
                        name: 'email',
                        id: 'email',
                        placeholder: 'Email',
                        pattern: emailPattern,
                        required: true
                    }
                ),
                password: fieldSchema.create(
                    3,
                    null,
                    {
                        type: 'password',
                        name: 'password',
                        id: 'password',
                        placeholder: 'Password',
                        pattern: passwordPattern,
                        required: true
                    }
                )
            }
        },
        buttons: {
            registerForm: {
                submit: {
                    text: 'Sign up',
                    type: 'submit'
                }
            },
            loginForm: {
                submit: {
                    text: 'Sign in',
                    type: 'submit'
                }
            }
        },
        footer: {
            registerForm: {
                span: {
                    text: 'Already have an account?'
                },
                link: {
                    text: 'Sign in.',
                    to: '/auth/login'
                }
            },
            loginForm: {
                span: {
                    text: 'Not a member yer?'
                },
                link: {
                    text: 'Sign up.',
                    to: '/auth/register'
                }
            }
        }
    }

};

function Form({ name, title = 'Fill in the form below' }) {
    const [formState, setFormState] = useState(function () {
        return {
            name,
            valid: false,
            elements: {
                fields: {
                    ...initialFormState.elements.fields[name]
                },
                buttons: {
                    ...initialFormState.elements.buttons[name]
                },
                footer: {
                    ...initialFormState.elements.footer[name]
                }
            }
        };
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
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const fieldPattern = new RegExp(e.target.pattern);
        const isValid = fieldPattern.test(fieldValue);

        let message = fieldName === 'username' 
            ? 'Username should be between 4 and 15 characters and can contain letters and digits, as well as hyphen, dot or underscore as a word separator.'
            : fieldName === 'email'
            ? 'Email should be in the format: <name>@<host>.'
            : fieldName === 'password'
            ? 'Password should be between 6 and 15 characters long and should contain one of the following: a letter, a digit and one of the allowed special symbols: @$!%*#?&'
            : 'Unknown error.';

        setFormState(state => ({
            ...state,
            valid: isValid,
            elements: {
                ...state.elements,
                fields: {
                    ...state.elements.fields,
                    [fieldName]: {
                        ...state.elements.fields[fieldName],
                        error: isValid
                            ? null
                            : message
                    }
                }
            }
        }));
    }, []);

    return (
        <form className="form" name={name} autoComplete="off" onSubmit={submitHandler} onChange={changeHandler}>
            <legend className="form-title">{title}</legend>
            {Object.values(formState.elements.fields).map(field => <FormInput key={field.key} error={field.error} {...field.props} />)}
            {Object.values(formState.elements.buttons).map((button, i) => <FormButton key={i + 1} {...button} />)}
            {<FormFooter {...formState.elements.footer} />}
        </form>
    );
}

export default Form;