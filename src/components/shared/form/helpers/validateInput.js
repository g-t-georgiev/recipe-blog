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

const checkSchemaConditions = function (fieldName, fieldValue, schema) {
    for (const check in schema[fieldName]) {
        if (!schema[fieldName].hasOwnProperty(check)) {
            return;
        }

        const condition = schema[fieldName][check];
        const isValid = checks[check](fieldValue, condition.value);

        if (!isValid) {
            return {
                name: fieldName,
                message: condition.message,
                valid: false
            };
        }
    }

    return {
        name: fieldName,
        message: '',
        valid: true
    }
}

export default function validator(formData, schema) {
    const errors = [];

    for (const fieldName in formData) {
        const fieldValue = formData[fieldName];

        errors.push(checkSchemaConditions(fieldName, fieldValue, schema));
    }

    return errors;
}