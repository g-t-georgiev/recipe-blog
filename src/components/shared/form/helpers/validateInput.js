const inputRequirements = {
    username: {
        minLength: {
            value: 4,
            message: 'Username should be at least 4 characters long.'
        },
        maxLength: {
            value: 20,
            message: 'Username should be 20 characters long at maximum.',
        },
        match: {
            value: /^(?![_.\-])(?!.*[_.\-]{2})[a-z0-9_.\-]{4,20}(?<![_.\-])$/i,
            message: 'Username can contain letters, digits and a dot, underscore or a hyphen as a word separator.'
        }
    },
    email: {
        match: {
            value: /^(.+@.+)(?<=\.[a-z]+)$/i,
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
            message: 'Password should be 20 characters long at maximum.'
        },
        match: {
            value: /^(?=.*[A-Za-z0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,20}$/,
            message: 'Password should contain letters, digits and at least one of the following special symbols: @$!%*#?&'
        }
    }
}

const checks = {
    minLength(value, charCount) {
        return value.length >= charCount;
    },
    maxLength(value, charCount) {
        return value.length <= charCount;
    },
    match(value, regex) {
        return regex.test(value);
    }
};