export const validationSchema = {
    username: {
        minLength: {
            value: 3,
            message: 'Username should be at least 3 characters long.'
        },
        maxLength: {
            value: 30,
            message: 'Username should be 30 characters long at maximum.',
        },
        match: {
            value: /^(?![_.-\s])(?!.*[_.-\s]{2})[a-z0-9_.-]{3,30}(?<![_.-\s])$/i,
            message: 'Username can contain letters, digits and a dot, an underscore or a hyphen as a separator.'
        }
    },
    email: {
        match: {
            value: /^(?!\s+).+@.+(?<=\.[a-z]+)$/i,
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
        },
        match: {
            value: /^(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&])[a-z0-9@$!%*#?&]{6,20}$/i,
            message: 'Password should contain at least one letter, one digit and one of the following symbols @$!%*#?&'
        }
    }
};