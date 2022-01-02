const inputSchema = {
    username: {
        minLength: {
            value: 3,
            message: 'Username should be at least 3 characters long.'
        },
        maxLength: {
            value: 30,
            message: 'Username should be 30 characters long at maximum.',
        }
    },
    email: {
        match: {
            value: /^(?![,\s]+).+@.+(?<![^a-z])$/i,
            message: 'Invalid email.'
        }
    },
    password: {
        minLength: {
            value: 6,
            message: 'Password should be at least 6 characters long.'
        },
        maxLength: {
            value: 20,
            message: 'Password should no more than 20 characters long.'
        }
    }
};

const formSchema = {
    loginForm: {
        email: inputSchema.email,
        password: inputSchema.password
    },
    registerForm: {
        username: inputSchema.username,
        email: inputSchema.email,
        password: inputSchema.password
    },
};

export function getValidationSchema(name) {
    return formSchema[name];
}