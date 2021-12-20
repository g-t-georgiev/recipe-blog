const inputRequirementsSchema = {
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
            value: /^(?![_.-\s])(?!.*[_.-\s]{2})[a-z0-9_.-]{4,20}(?<![_.-\s])$/i,
            message: 'Username can contain letters, digits and a dot, underscore or a hyphen as a word separator.'
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
            message: 'Password should be 20 characters long at maximum.'
        },
        match: {
            value: /^(?!\s+)(?=.*[A-Za-z0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,20}(?<!\s+)$/,
            message: 'Password should contain only letters, digits and at least one of the following special symbols: @$!%*#?&'
        }
    }
};

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

export default function validator(fieldName, fieldValue) {
    const fieldSchema = inputRequirementsSchema[fieldName];
    
    for (const condition in fieldSchema) {
        if (!fieldSchema.hasOwnProperty(condition)) {
            return;
        }

        const { value: conditionValue, message } = fieldSchema[condition];
        const valid = checks[condition](fieldValue, conditionValue);

        if (!valid) {
            return {
                valid,
                message
            };
        }
    }

    return {
        valid: true,
        message: ''
    }
}